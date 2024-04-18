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
            if(!validPass)
                return { status:false, message:'Password is incorrect!' };
            const accessToken = createAccessToken(user, process.env.ACCESS_SECRET_KEY || '', process.env.ACCESS_EXPIRY || '');
            const refreshToken = createRefreshToken(user, process.env.REFRESH_SECRET_KEY || '', process.env.REFRESH_EXPIRY || '');
            delete user.password;
            return { status:true, user: user, accessToken, refreshToken }
        } catch(err){
            console.error('ERR: AdminUseCase --> login()', err);            
            throw err;
        }
    }

    async resetPassword(userId:string, oldPassword:string, newPassword:string){
        try{
            const user = await this.repo.findById(userId);
            if(!user || !user.password)
                return { status: false, message:'User not found!' };
            const passwordMatch = await comparePassword(oldPassword, user.password);
            if(!passwordMatch)
                return { status: false, message:'Current password is incorrect!' };                
            const hashedPassword = await hashPassword(newPassword);
            const response = await this.repo.updatePassword(userId, hashedPassword);
            if(!response)
                return { status: false, message:'Some error occurred while status update!' };
            delete response.password;                  
            return { status: true, user: response };
        } catch(err){
            console.error('ERR: AdminUseCase --> resetPassword()', err);
            throw err;
        }
    }
}