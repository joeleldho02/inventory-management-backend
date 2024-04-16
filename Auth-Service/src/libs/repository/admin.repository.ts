import { injectable } from "inversify";
import { AdminDb } from './schema/admin.schema';
import AdminEntity from "../entities/admin.entity";

@injectable()
export class AdminRepository{
    private db: typeof AdminDb;

    constructor(){
        this.db = AdminDb;
    }
    async findByEmail(email: string):Promise<AdminEntity> {
        try{
            let user = await this.db.findOne({email: email}).lean();
            return user as AdminEntity;
        } catch(err){
            console.log('ERR: AdminRepository -> findByEmail() ', err);
            throw new Error('Error in finding user!');
        }
    }

    async findById(userId: string):Promise<AdminEntity> {
        try{
            let user = await this.db.findById(userId).lean();
            return user as AdminEntity;
        } catch(err){
            console.log('ERR: AdminRepository -> findById() ', err);
            throw new Error('Error in finding user!');
        }
    }

    async updatePassword(userId:string, password: string):Promise<AdminEntity>{
        try{
            let user = await this.db.findByIdAndUpdate(userId, { password: password, updatedOn: Date.now()}, { new: true }).lean();
            return user as AdminEntity;
        } catch(err){
            console.log('ERR: AdminRepository -> updatePassword() ', err);
            throw new Error('Error in updating user!');
        }
    }
}