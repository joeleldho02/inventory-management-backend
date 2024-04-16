import { injectable } from "inversify";
import { UserDb } from './schema/user.schema';
import UserEntity from "../entities/user.entity";

@injectable()
export class UserRepository{
    private db: typeof UserDb;

    constructor(){
        this.db = UserDb;
    }

    async findById(userId: string):Promise<UserEntity> {
        try{
            let user = await this.db.findById(userId).lean();
            return user as UserEntity;
        } catch(err){
            console.log('ERR: UserRepository -> findById() ', err);
            throw new Error('Error in finding user!');
        }
    }

    async findByEmail(email: string):Promise<UserEntity> {
        try{
            let user = await this.db.findOne({email: email}).lean();
            return user as UserEntity;
        } catch(err){
            console.log('ERR: UserRepository -> findByEmail() ', err);
            throw new Error('Error in finding user!');
        }
    }

    async updatePassword(userId:string, password: string):Promise<UserEntity>{
        try{
            let user = await this.db.findByIdAndUpdate(userId, { password: password, updatedOn: Date.now()}, { new: true }).lean();
            return user as UserEntity;
        } catch(err){
            console.log('ERR: UserRepository -> updatePassword() ', err);
            throw new Error('Error in updating user!');
        }
    }

    async updateIsActive(userId:string, isActive: boolean):Promise<UserEntity>{
        try{
            let user = await this.db.findByIdAndUpdate(userId, { isActive: isActive, updatedOn: Date.now()}, { new: true }).lean();
            return user as UserEntity;
        } catch(err){
            console.log('ERR: UserRepository -> updateIsActive() ', err);
            throw new Error('Error in updating user!');
        }
    }
    

}