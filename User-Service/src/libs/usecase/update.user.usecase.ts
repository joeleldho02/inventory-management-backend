import { inject, injectable } from "inversify";
import { UserRepository } from "../repository/user.repository";
import { INTERFACE_TYPE } from "../../utils/appConsts";
import UserEntity from "../entities/user.entity";

@injectable()
export class UpdateUserUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo:UserRepository){}
    
    async execute(userId:string, userData: UserEntity){
        try{
            const response = await this.repo.update(userId, userData);
            if(response)
                return { status:true, user: response };
            return { status:false, message: 'User not found!' };
        } catch(err){
            console.log('ERR: UpdateUserUseCase --> exceute() ', err);            
            throw err;
        }
    }
}