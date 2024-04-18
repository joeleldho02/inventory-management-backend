import { injectable } from "inversify";
import { UserDb } from '../schema/user.schema';
import UserEntity from "../../entities/user.entity";
import { IUserRepository } from "./IUserRepository";

@injectable()
export class UserRepository implements IUserRepository{
    private db: typeof UserDb;

    constructor(){
        this.db = UserDb;
    }

    async create(userData: UserEntity) {
        try{
            await this.db.create({ ...userData, updatedBy:userData.createdBy });   
        } catch(err){
            console.error('ERR: UserRepository -> create() ', err);  
            throw new Error("Error in creating user!");
        }
    }

    async findById(userId: string):Promise<UserEntity> {
        try{
            const user = await this.db.findById(userId).lean();
            return user as UserEntity;
        } catch(err){
            console.error('ERR: UserRepository -> findById() ', err);
            throw new Error('Error in finding user!');
        }
    }

    async findByEmail(email: string):Promise<UserEntity> {
        try{
            const user = await this.db.findOne({email: email}).lean();
            return user as UserEntity;
        } catch(err){
            console.error('ERR: UserRepository -> findByEmail() ', err);
            throw new Error('Error in finding user!');
        }
    }

    async updatePassword(userId:string, password: string):Promise<UserEntity>{
        try{
            const user = await this.db.findByIdAndUpdate(userId, { password: password, updatedOn: Date.now()}, { new: true }).lean();
            return user as UserEntity;
        } catch(err){
            console.error('ERR: UserRepository -> updatePassword() ', err);
            throw new Error('Error in updating user!');
        }
    }

    async updateIsActive(userId:string, isActive: boolean):Promise<UserEntity>{
        try{
            const user = await this.db.findByIdAndUpdate(userId, { isActive: isActive, updatedOn: Date.now()}, { new: true }).lean();
            return user as UserEntity;
        } catch(err){
            console.error('ERR: UserRepository -> updateIsActive() ', err);
            throw new Error('Error in updating user!');
        }
    }
}