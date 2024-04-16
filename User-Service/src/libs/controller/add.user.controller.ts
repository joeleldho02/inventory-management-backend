import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import UserEntity from "../entities/user.entity";
import { AddUserUseCase } from "../usecase/add.user.usecase";
import { INTERFACE_TYPE } from "../../utils/appConsts";

@injectable()
export class AddUserController{
    constructor(@inject(INTERFACE_TYPE.AddUserUseCase) private usecase: AddUserUseCase) {}

    async addUser(req:Request, res:Response, next:NextFunction){
        try{            
            if(Object.keys(req.body).length === 0)
                throw new Error('User data is missing!');
            
            const userData = new UserEntity(req.body);  
            const response = await this.usecase.execute(userData);
            if(response.status)
                res.status(201).json(response);
            else
                res.status(500).json(response);
        } catch(err){
            console.log('ERR: AddUserController -> addUser() ', err);            
            next(err);
        }
    }
}