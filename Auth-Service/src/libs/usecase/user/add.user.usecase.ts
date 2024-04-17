import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import UserEntity from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

@injectable()
export class AddUserUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo: UserRepository) {}

    async execute(userData:UserEntity){
        try{
            await this.repo.create(userData);
        } catch(err){
            console.log('ERR: AddUserUseCase -> execute() ', err);
            throw err;
        }
    }
}