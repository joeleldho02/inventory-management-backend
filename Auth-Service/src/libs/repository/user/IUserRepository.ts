import UserEntity from "../../entities/user.entity";

export interface IUserRepository{
    create(userData: UserEntity);
    findById(userId: string):Promise<UserEntity>;
    findByEmail(email: string):Promise<UserEntity>;
    updatePassword(userId:string, password: string):Promise<UserEntity>
    updateIsActive(userId:string, isActive: boolean):Promise<UserEntity>;
}