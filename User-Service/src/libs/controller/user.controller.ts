import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../utils/interface/interface.types";
import UserEntity from "../entities/user.entity";
import { UserUseCase } from "../usecase/user.usecase";
import { IUserController } from "./IUserController";

@injectable()
export class UserController implements IUserController{
    constructor(@inject(INTERFACE_TYPE.UserUseCase) private usecase: UserUseCase) {}

    async addUser(req:Request, res:Response, next:NextFunction){
        try{
            if(Object.keys(req.body).length === 0)
                throw new Error('User data not entered!');            
            const userData = new UserEntity(req.body);  
            const response = await this.usecase.addUser(userData);
            if(response.status)
                res.status(201).json(response);
            else
                res.status(500).json(response);
        } catch(err){
            console.error('ERR: UserController -> addUser() ', err);            
            next(err);
        }
    }

    async updateUser(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body)
                throw new Error('User data not entered!');
            const { userId } = req.body;
            const userData = new UserEntity(req.body);  
            const response = await this.usecase.updateUser(userId, userData);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.error('ERR: UserController --> updateUser() ');
            next(err);
        }
    }

    async updateStatus(data:Record<string, string>){
        try{
            const { userId } = data;
            const userData = new UserEntity(data);  
            await this.usecase.updateUser(userId, userData);
        } catch(err){
            console.error('ERR: UserController --> updateStatus() ', err);
        }
    }

    async getUser(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.params.userId)
                throw new Error('User ID is missing!');
            const { userId } = req.params;
            const response = await this.usecase.getUser(userId);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.error('ERR: UserController --> getUser()', err);
            next(err);
        }
    }

    async getUsers(req:Request, res:Response, next:NextFunction){
        try{
            let page = 1, limit = 10, skip = 0;
            if(req.query.page && parseInt(req.query?.page as string) > 0)
                page = parseInt(req.query?.page as string);
            if(req.query.limit && parseInt(req.query?.limit as string) > 5)
                limit = parseInt(req.query?.limit as string);
            skip = (page - 1) * limit;
                        
            const response = await this.usecase.getUsers(limit, skip);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.error('ERR: UserController --> getUsers()', err);
            next(err);
        }
    }

    async deleteUser(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.params.userId)
                throw new Error('User not selected!');
            const { userId } = req.params;
            const response = await this.usecase.deleteUser(userId);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.error('ERR: UserController --> deleteUser()', err);
            next(err);
        }
    }

}