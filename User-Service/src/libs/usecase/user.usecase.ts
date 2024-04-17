import { injectable, inject } from "inversify";
import { addUserProducer } from "../../events/auth-svc.producer";
import { hashPassword } from "../../helper/hashPassword";
import { INTERFACE_TYPE } from "../../utils/interface/interface.types";
import UserEntity from "../entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { IUserUsecase } from "./IUserUsecase";

@injectable()
export class UserUseCase implements IUserUsecase{
    constructor(@inject(INTERFACE_TYPE.UserRepository) private repo: UserRepository) {}

    async addUser(userData:UserEntity){
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
            console.log('ERR: UserUseCase -> addUser() ', err);
            throw err;
        }
    }

    async updateUser(userId:string, userData: UserEntity){
        try{
            const response = await this.repo.update(userId, userData);
            if(response)
                return { status:true, user: response };
            return { status:false, message: 'User not found!' };
        } catch(err){
            console.log('ERR: UserUseCase --> updateUser() ', err);            
            throw err;
        }
    }

    async getUser(userId:string){
        try{
            const response = await this.repo.findById(userId);
            if(response)
                return { status: true, user: response };
            return { status: false, messsage: 'User not found!' };
        } catch(err){
            console.log('ERR: UserUseCase --> getUser()', err);
            throw err;
        }
    }

    async getUsers(limit: number, skip: number) {
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
            console.log('ERR: UserUseCase --> getUsers()', err);
            throw err;
        }
    }  

    async deleteUser(id:string){
        try{
            const response = await this.repo.delete(id);
            if(response)
                return { status:true, user:response};
            return { status:false, message:'Error in deleting user! User not found.' };
        } catch(err){
            console.log('ERR: UserUseCase --> deleteUser()', err);            
            throw err;
        }
    }
}