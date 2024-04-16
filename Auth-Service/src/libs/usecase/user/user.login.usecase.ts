import { inject, injectable } from "inversify";
import { UserRepository } from "../../repository/user.repository";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { comparePassword } from "../../../helper/hashPassword";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt/createToken";

@injectable()
export class UserLoginUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo:UserRepository){}

    async execute(email:string, password:string){
        try{
            const user = await this.repo.findByEmail(email);
            if(!user || !user.password)
                return { status:false, message:'User not found!' };
            const validPass = await comparePassword(password, user.password);
            if(!user.isActive)
                return { status:false, message:'User is blocked by administrator! Please contact administrator.' }
            if(validPass){
                const accessToken = createAccessToken(user, process.env.ACCESS_SECRET_KEY || '', process.env.ACCESS_EXPIRY || '');
                const refreshToken = createRefreshToken(user, process.env.REFRESH_SECRET_KEY || '', process.env.REFRESH_EXPIRY || '');
                delete user.password;
                return { status:true, user: user, accessToken, refreshToken }
            }
            return { status:false, message:'Password is incorrect!' };
        } catch(err){
            console.log('ERR: UserLoginUseCase --> execute()', err);            
            throw err;
        }
    }
}