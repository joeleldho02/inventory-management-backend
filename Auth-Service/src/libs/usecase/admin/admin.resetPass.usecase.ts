import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { comparePassword, hashPassword } from "../../../helper/hashPassword";
import { AdminRepository } from "../../repository/admin.repository";

@injectable()
export class AdminResetPassUseCase{
    constructor(@inject(INTERFACE_TYPE.AdminRepository) private repo:AdminRepository){}

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
            console.log('ERR: AdminResetPassUseCase --> execute()', err);
            throw err;
        }
    }
}