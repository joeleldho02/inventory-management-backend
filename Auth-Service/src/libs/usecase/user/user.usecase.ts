import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import UserEntity from "../../entities/user.entity";
import { UserRepository } from "../../repository/user/user.repository";
import { updateUserStatusProducer } from "../../../events/user-svc.producer";
import { comparePassword, hashPassword } from "../../../helper/hashPassword";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt/createToken";
import { IUserUsecase } from "./IUserUsecase";

@injectable()
export class UserUseCase implements IUserUsecase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo: UserRepository) {}

    async addUser(userData:UserEntity){
        try{
            await this.repo.create(userData);
        } catch(err){
            console.log('ERR: AddUserUseCase -> execute() ', err);
            throw err;
        }
    }

    async updateUser(userId:string, isActive: boolean){
        try{
            const user = await this.repo.findById(userId);
            
            if(user){
                if(user.isActive == undefined)
                    return { status: false, message:'User does not have isActive feild!' };   
                if(user.isActive.toString() === isActive.toString())
                    return { status: false, message:'Input status is current status!' };   
                const response = await this.repo.updateIsActive(userId, isActive);
                if(response){
                    updateUserStatusProducer(userId, isActive, "userTopic", "updateStatus");
                    delete response.password;                    
                    return { status: true, user: response };
                }
                return { status: false, message:'Some error occurred while status update!' };                
            }
            return { status: false, message:'User not found!' };
        } catch(err){
            console.log('ERR: UserUpdateStatusUseCase --> execute()', err);
            throw err;
        }
    }

    async resetPassword(userId:string, oldPassword:string, newPassword:string){
        try{
            const user = await this.repo.findById(userId);
            if(user && user.password){
                const passwordMatch = await comparePassword(oldPassword, user.password);
                if(passwordMatch){
                    const hashedPassword = await hashPassword(newPassword);
                    const response = await this.repo.updatePassword(userId, hashedPassword);
                    if(response){
                        delete response.password;                    
                        return { status: true, user: response };
                    }
                }
                return { status: false, message:'Current password incorrect!' };                
            }
            return { status: false, message:'User not found!' };
        } catch(err){
            console.log('ERR: UserResetPasswordUseCase --> execute()', err);
            throw err;
        }
    }

    async login(email:string, password:string){
        try{
            const user = await this.repo.findByEmail(email);            
            if(!user || !user.password)
                return { status:false, message:'User not found!' };
            const validPass = await comparePassword(password, user.password);
            if(!user.isActive)
                return { status:false, message:'User is blocked by administrator! Please contact administrator.' }
            if(validPass){
                delete user.password;                
                const accessToken = createAccessToken(user, process.env.ACCESS_SECRET_KEY || '', process.env.ACCESS_EXPIRY || '');
                const refreshToken = createRefreshToken(user, process.env.REFRESH_SECRET_KEY || '', process.env.REFRESH_EXPIRY || '');
                return { status:true, user: user, accessToken, refreshToken }
            }
            return { status:false, message:'Password is incorrect!' };
        } catch(err){
            console.log('ERR: UserLoginUseCase --> execute()', err);            
            throw err;
        }
    }
}