import { inject, injectable } from "inversify";
import { DeleteUserUseCase } from "../usecase/delete.user.usecase";
import { INTERFACE_TYPE } from "../../utils/appConsts";
import { NextFunction, Request, Response } from "express";

@injectable()
export class DeleteUserController{
    constructor(@inject(INTERFACE_TYPE.DeleteUserUseCase) private usecase:DeleteUserUseCase){}

    async deleteUser(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.params.userId)
                throw new Error('User not selected!');
            const { userId } = req.params;
            const response = await this.usecase.execute(userId);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.log('ERR: DeleteUserController --> deleteUser()', err);
            next(err);
        }
    }
}