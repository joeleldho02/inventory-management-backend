import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetUsersUseCase } from "../usecase/get.users.usecase";
import { INTERFACE_TYPE } from "../../utils/appConsts";

@injectable()
export class GetUsersController{
    constructor(@inject(INTERFACE_TYPE.GetUsersUseCase) private usecase: GetUsersUseCase) {}

    async getUsers(req:Request, res:Response, next:NextFunction){
        try{
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = parseInt(req.query.skip as string) || 0;
            const response = await this.usecase.execute(limit, skip);
            if(response.status)
                res.status(200).json(response);
            else
                res.status(500).json(response);
        } catch(err){
            next(err);
        }
    }
}