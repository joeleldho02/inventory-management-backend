import { NextFunction, Request, Response } from "express";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { UserUpdateStatusUseCase } from "../../usecase/user/user.updateStatus.usecase";
import { injectable, inject } from "inversify";

@injectable()
export class UserUpdateStatusController{
    constructor(@inject(INTERFACE_TYPE.UserUpdateStatusUseCase) private usecase:UserUpdateStatusUseCase){}

    async statusUpdate(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body )
                throw new Error('No input data received!');
            if(!req.body.userId )
                throw new Error('User Id is required!');
            
            const { userId, isActive } = req.body;
            const response = await this.usecase.execute(userId, isActive);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.log('ERR: UserUpdateStatusController --> ', err);
            next(err);
        }
    }
}