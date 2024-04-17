import UserEntity from "../../libs/entities/user.entity";

export interface IUserRepository {
  create(userData: UserEntity) ; 
  update(userId: string, userData: UserEntity);
  findAll(limit: number, skip: number);
  findById(userId: string);
  delete(userId: string);
  userEmailExist(email:string) : Promise<boolean>;
}