import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../utils/interface/interface.types";
import { UserRepository } from "../repository/user.repository";
import UserEntity from "../entities/user.entity";
import { hashPassword } from "../../helper/hashPassword";
import { addUserProducer } from "../../events/auth-svc.producer";

@injectable()
export class AddUserUseCase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo: UserRepository) {}

    async execute(userData:UserEntity){
        try{
            if(!userData.email)
                return { status: false, message: "Email is required!" };
            
            const userExist = await this.repo.userEmailExist(userData.email);
            if(userExist) 
                return { status: false, message: "Email already exists!" };            
            if(!userData.password)
                return { status: false, message: "Password is required!" };
            
            const hashedPassword = await hashPassword(userData.password);
            userData.password = hashedPassword;
            const response = await this.repo.create(userData);
            if(response){              
                addUserProducer(response, hashedPassword, "authTopic", "addUser");
                return { status: true, user:response };
            }
            return { status: false, message: "Error in creating user!" };
        } catch(err){
            console.log('ERR: AddUserUseCase -> execute() ', err);
            throw err;
        }
    }
}