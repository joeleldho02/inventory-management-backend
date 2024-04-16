import { inject, injectable } from "inversify";
import { UpdateUserUseCase } from "../usecase/update.user.usecase";
import { INTERFACE_TYPE } from "../../utils/appConsts";
import { NextFunction, Request, Response } from "express";
import UserEntity from "../entities/user.entity";

@injectable()
export class UpdateUserController{
    constructor(@inject(INTERFACE_TYPE.UpdateUserUseCase) private usecase:UpdateUserUseCase){}

    async updateUser(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body)
                throw new Error('User data not entered!');
            const { userId } = req.body;
            const userData = new UserEntity(req.body);  
            const response = await this.usecase.execute(userId, userData);
            if(response.status)
                res.status(200).json(response);
            else
                res.status(500).json(response);
        } catch(err){
            console.log('ERR: UpdateUserController --> updateUser() ');
            next(err);
        }
    }
}