import UserEntity from "../entities/user.entity";

export interface IUserUsecase{
    addUser(userData:UserEntity);
    updateUser(userId:string, userData: UserEntity);
    getUser(userId:string);
    getUsers(limit: number, skip: number);
    deleteUser(id:string);
}