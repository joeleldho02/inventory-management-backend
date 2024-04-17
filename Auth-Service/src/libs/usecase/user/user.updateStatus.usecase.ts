import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { UserRepository } from "../../repository/user.repository";
import { updateUserStatusProducer } from "../../../events/user-svc.producer";

@injectable()
export class UserUpdateStatusUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo:UserRepository){}

    async execute(userId:string, isActive: boolean){
        try{
            const user = await this.repo.findById(userId);
            
            if(user){
                if(user.isActive == undefined)
                    return { status: false, message:'User does not have isActive feild!' };   
                if(user.isActive.toString() === isActive.toString())
                    return { status: false, message:'Input status is current status!' };   
                const response = await this.repo.updateIsActive(userId, isActive);
                if(response){
                    updateUserStatusProducer(userId, isActive, "userTopic", "updateStatus");
                    delete response.password;                    
                    return { status: true, user: response };
                }
                return { status: false, message:'Some error occurred while status update!' };                
            }
            return { status: false, message:'User not found!' };
        } catch(err){
            console.log('ERR: UserUpdateStatusUseCase --> execute()', err);
            throw err;
        }
    }
}