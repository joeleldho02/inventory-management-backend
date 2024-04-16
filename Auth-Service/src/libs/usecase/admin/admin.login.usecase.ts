import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { comparePassword } from "../../../helper/hashPassword";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt/createToken";
import { AdminRepository } from "../../repository/admin.repository";

@injectable()
export class AdminLoginUseCase{
    constructor(@inject(INTERFACE_TYPE.AdminRepository) private repo:AdminRepository){}

    async execute(email:string, password:string){
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
            console.log('ERR: AdminLoginUseCase --> execute()', err);            
            throw err;
        }
    }
}