import { inject, injectable } from "inversify";
import { UserRepository } from "../repository/user.repository";
import { INTERFACE_TYPE } from "../../utils/appConsts";

@injectable()
export class GetUsersUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo: UserRepository) {}

    async execute(limit: number, skip: number) {
        try{
            const response = await this.repo.findAll(limit, skip);
            if(response)
                return { status:true, users:response };
            return { status:false, message:'Error in fetching all users' };
        } catch(err){
            console.log(err);
            throw err;
        }
    }    
}