import { inject, injectable } from "inversify";
import { UserRepository } from "../repository/user.repository";
import { INTERFACE_TYPE } from "../../utils/interface/interface.types";

@injectable()
export class DeleteUserUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo:UserRepository){}

    async execute(id:string){
        try{
            const response = await this.repo.delete(id);
            if(response)
                return { status:true, user:response};
            return { status:false, message:'Error in deleting user! User not found.' };
        } catch(err){
            console.log('ERR: DeleteUserUseCase --> execute()', err);            
            throw err;
        }
    }
}