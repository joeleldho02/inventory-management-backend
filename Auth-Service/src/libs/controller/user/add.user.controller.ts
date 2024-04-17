import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import UserEntity from "../../entities/user.entity";
import { AddUserUseCase } from "../../usecase/user/add.user.usecase";

@injectable()
export class AddUserController{
    constructor(@inject(INTERFACE_TYPE.AddUserUseCase) private usecase: AddUserUseCase) {}

    async addUser(userData:any, password:string){
        try{
            const user = new UserEntity({...userData, password});  
            console.log(user);
            
            await this.usecase.execute(user);
        } catch(err){
            console.log('ERR: AddUserController -> addUser() ', err); 
        }
    }
}