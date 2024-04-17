import { inject, injectable } from "inversify";
import { GetUserUseCase } from "../usecase/get.user.useCase";
import { INTERFACE_TYPE } from "../../utils/interface/interface.types";
import { NextFunction, Request, Response } from "express";

@injectable()
export class GetUserController{
    constructor(@inject(INTERFACE_TYPE.GetUserUseCase) private usecase:GetUserUseCase){}

    async getUser(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.params.userId)
                throw new Error('User ID is missing!');
            const { userId } = req.params;
            const response = await this.usecase.execute(userId);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.log('ERR: FindUserController --> findUser()', err);
            next(err);
        }
    }
}