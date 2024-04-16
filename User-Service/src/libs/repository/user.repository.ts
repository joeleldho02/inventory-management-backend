import { IUserRepository } from "../../utils/interface/IUserRepository";
import UserEntity from "../entities/user.entity";
import { UserDb } from "./schema/user.schema";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository{
    private db: typeof UserDb;
    
    constructor(){
        this.db = UserDb;
    }

    async create(userData: UserEntity) {
        try{
            const user = await this.db.create({ ...userData, updatedBy:userData.createdBy });
            delete user.password;
            return user;          
        } catch(err){
            console.log('ERR: UserRepository -> create() ', err);  
            throw new Error("Error in creating user!");
        }
    }
    
    async update(userId: string, userData: UserEntity) {
        try{
            userData.updatedOn = new Date();            
            const user = await this.db.findByIdAndUpdate(userId, userData, {new: true});
            if(user?.password)
                delete user.password;
            return user;
        } catch(err){            
            console.log('ERR: UserRepository -> update() ', err);
            throw new Error("Error in updating user!"); 
        }
    }
    
    async findAll(limit = 10, skip = 0) {
        try{
            const users = await this.db.find({},{password:0, createdBy:0, updatedBy:0, updatedOn:0})
                                        .skip(skip)
                                        .limit(limit)
                                        .sort({createdOn:-1})
                                        .lean();
            return users;
        }catch(err){
            console.log('ERR: UserRepository -> findAll() ', err);
            throw new Error("Error in fetching all users!"); 
        }
    }

    async findById(userId: string) {
        try{
            let user = await this.db.findById(userId, {password:0});
            return user;
        } catch(err){
            console.log('ERR: UserRepository -> findById() ', err);
            throw new Error('Error in finding user!');
        }
    }
    async delete(userId: string) {
        try{
            let user = await this.db.findByIdAndDelete(userId);
            if(user?.password)
                delete user.password;                        
            return user;
        } catch(err){
            console.log('ERR: UserRepository -> delete() ', err);
            throw new Error("Error in deleteing user!"); 
        }
    }
    async userEmailExist(email: string) {
        try {
            let user = await this.db.findOne({ email: email });
            if(user){
              return true;
            }
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}