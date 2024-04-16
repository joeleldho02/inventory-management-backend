import { inject, injectable } from "inversify";
import { UserRepository } from "../../repository/user.repository";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { comparePassword, hashPassword } from "../../../helper/hashPassword";

@injectable()
export class UserResetPassUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo:UserRepository){}

    async execute(userId:string, oldPassword:string, newPassword:string){
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
}