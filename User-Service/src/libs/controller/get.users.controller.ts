import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetUsersUseCase } from "../usecase/get.users.usecase";
import { INTERFACE_TYPE } from "../../utils/interface/interface.types";

@injectable()
export class GetUsersController{
    constructor(@inject(INTERFACE_TYPE.GetUsersUseCase) private usecase: GetUsersUseCase) {}

    async getUsers(req:Request, res:Response, next:NextFunction){
        try{
            let page = 1, limit = 10, skip = 0;
            if(req.query.page && parseInt(req.query?.page as string) > 0)
                page = parseInt(req.query?.page as string);
            if(req.query.limit && parseInt(req.query?.limit as string) > 5)
                limit = parseInt(req.query?.limit as string);
            skip = (page - 1) * limit;
                        
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