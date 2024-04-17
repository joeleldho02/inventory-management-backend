import { injectable, inject } from "inversify";
import { comparePassword, hashPassword } from "../../../helper/hashPassword";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt/createToken";
import { AdminRepository } from "../../repository/admin/admin.repository";
import { IAdminUseCase } from "./IAdminUsecase";

@injectable()
export class AdminUseCase implements IAdminUseCase{
    constructor(@inject(INTERFACE_TYPE.AdminRepository) private repo:AdminRepository){}

    async login(email:string, password:string){
        try{
            const user = await this.repo.findByEmail(email);
            if(!user || !user.password)
                return { status:false, message:'User not found!' };
            const validPass = await comparePassword(password, user.password);
            if(validPass){
                const accessToken = createAccessToken(user, process.env.ACCESS_SECRET_KEY || '', process.env.ACCESS_EXPIRY || '');
                const refreshToken = createRefreshToken(user, process.env.REFRESH_SECRET_KEY || '', process.env.REFRESH_EXPIRY || '');
                delete user.password;
                return { status:true, user: user, accessToken, refreshToken }
            }
            return { status:false, message:'Password is incorrect!' };
        } catch(err){
            console.log('ERR: AdminUseCase --> login()', err);            
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
            console.log('ERR: AdminUseCase --> resetPassword()', err);
            throw err;
        }
    }
}