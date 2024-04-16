import { inject, injectable } from "inversify";
import { UserRepository } from "../repository/user.repository";
import { INTERFACE_TYPE } from "../../utils/appConsts";

@injectable()
export class GetUserUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo:UserRepository){}

    async execute(userId:string){
        try{
            const response = await this.repo.findById(userId);
            if(response)
                return { status: true, user: response };
            return { status: false, messsage: 'User not found!' };
        } catch(err){
            console.log('ERR: FindUserUseCase --> execute()', err);
            throw err;
        }
    }
}