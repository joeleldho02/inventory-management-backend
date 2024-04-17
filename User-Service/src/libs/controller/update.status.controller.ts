import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../utils/interface/interface.types";
import UserEntity from "../entities/user.entity";
import { UpdateUserUseCase } from "../usecase/update.user.usecase";

@injectable()
export class UpdateStatusController{
    constructor(@inject(INTERFACE_TYPE.UpdateUserUseCase) private usecase:UpdateUserUseCase){}

    async updateStatus(data:Record<string, string>){
        try{
            const { userId } = data;
            const userData = new UserEntity(data);  
            await this.usecase.execute(userId, userData);
        } catch(err){
            console.log('ERR: UpdateUserController --> updateUser() ', err);
        }
    }
}