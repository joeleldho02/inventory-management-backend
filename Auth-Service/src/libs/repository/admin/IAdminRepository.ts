import AdminEntity from "../../entities/admin.entity";

export interface IAdminRepository{
    findByEmail(email: string):Promise<AdminEntity>;
    findById(userId: string):Promise<AdminEntity>;
    updatePassword(userId:string, password: string):Promise<AdminEntity>;
    
}