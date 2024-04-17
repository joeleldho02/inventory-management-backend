import UserEntity from "../../entities/user.entity";

export interface IUserUsecase{
    addUser(userData:UserEntity);
    updateUser(userId:string, isActive: boolean);
    resetPassword(userId:string, oldPassword:string, newPassword:string);
    login(email:string, password:string)
}