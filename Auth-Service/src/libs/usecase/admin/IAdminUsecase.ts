export interface IAdminUseCase{
    login(email:string, password:string);
    resetPassword(userId:string, oldPassword:string, newPassword:string);
}