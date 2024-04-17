import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { NextFunction, Request, Response } from "express";
import { UserResetPassUseCase } from "../../usecase/user/user.resetpass.usecase";

@injectable()
export class UserResetPassController{
    constructor(@inject(INTERFACE_TYPE.UserResetPassUseCase) private usecase:UserResetPassUseCase){}

    async resetPassword(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body || !req.body.oldPassword || !req.body.newPassword )
                throw new Error('Both old and new passwords are required!');
            if(!req.body.userId )
                throw new Error('User Id is required!');
            
            const { userId, oldPassword, newPassword } = req.body;
            const response = await this.usecase.execute(userId, oldPassword, newPassword);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.log('ERR: UserResetPassController --> ', err);
            next(err);
        }
    }
}