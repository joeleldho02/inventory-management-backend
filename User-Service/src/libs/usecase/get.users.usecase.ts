import { inject, injectable } from "inversify";
import { UserRepository } from "../repository/user.repository";
import { INTERFACE_TYPE } from "../../utils/interface/interface.types";

@injectable()
export class GetUsersUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo: UserRepository) {}

    async execute(limit: number, skip: number) {
        try{
            const docCount = await this.repo.getDocCount() || -1; 
            
            if(skip > docCount){
                if(docCount < limit)
                    skip = 0;
                else{
                    const lastPage = Math.abs(Math.ceil(docCount % limit));
                    skip = (lastPage - 1) * limit;
                }
            } else if(skip === docCount){
                skip -= limit;
            }           

            const response = await this.repo.findAll(limit, skip);
            if(response)
                return { status:true, users:response, count:docCount };
            return { status:false, message:'Error in fetching all users' };
        } catch(err){
            console.log(err);
            throw err;
        }
    }    
}