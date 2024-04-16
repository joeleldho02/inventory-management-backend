import UserEntity from "../../libs/entities/user.entity";

export interface IUserRepository {
  create(userData: UserEntity) : any; 
  update(userId: string, userData: UserEntity) : any;
  findAll(limit: number, skip: number) : any;
  findById(userId: string) : any;
  delete(userId: string) : any;
  userEmailExist(email:string) : Promise<boolean>;
}