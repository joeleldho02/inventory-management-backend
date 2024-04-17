import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import UserEntity from "../../entities/user.entity";
import { UserUseCase } from "../../usecase/user/user.usecase";
import { NextFunction, Request, Response } from "express";
import { IUserController } from "./IUserController";

@injectable()
export class UserController implements IUserController{
    constructor(@inject(INTERFACE_TYPE.UserUseCase) private usecase: UserUseCase) {}

    async addUser(userData:any, password:string){
        try{
            console.log(userData);
            
            const user = new UserEntity({...userData, password});  
            console.log(user);
            
            await this.usecase.addUser(user);
        } catch(err){
            console.log('ERR: UserController -> addUser() ', err); 
        }
    }

    async updateStatus(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body )
                throw new Error('No input data received!');
            if(!req.body.userId )
                throw new Error('User Id is required!');
            
            const { userId, isActive } = req.body;
            const response = await this.usecase.updateUser(userId, isActive);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.log('ERR: UserController --> updateStatus()', err);
            next(err);
        }
    }

    async resetPassword(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body || !req.body.oldPassword || !req.body.newPassword )
                throw new Error('Both old and new passwords are required!');
            if(!req.body.userId )
                throw new Error('User Id is required!');
            
            const { userId, oldPassword, newPassword } = req.body;
            const response = await this.usecase.resetPassword(userId, oldPassword, newPassword);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.log('ERR: UserController --> resetPassword() ', err);
            next(err);
        }
    }

    async userLogin(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body || !req.body.email || !req.body.password)
                throw new Error('Email and password is required!');
            const { email, password } = req.body;
            const response = await this.usecase.login(email, password);
            if(response.status){
                res.cookie("userAccessToken", response.accessToken, {
                    maxAge: 60000,
                    httpOnly: true,
                    secure:true,
                    sameSite:"strict"
                });
                res.cookie("userRefreshToken", response.refreshToken, {
                  maxAge: 3600000,
                  httpOnly: true,
                  secure:true,
                  sameSite: "strict",
                });
                delete response.refreshToken;
                return res.status(201).json(response);
            }
            return res.status(500).json(response);
        } catch(err){
            console.log('ERR: UserController --> userLogin() ', err);
            next(err);
        }
    }

    userLogout(req:Request, res:Response, next:NextFunction){
        try{
            res.clearCookie("userAccessToken");
            res.clearCookie("userRefreshToken");
            res.status(200).json({ status: true });
        } catch(err){
            console.log('ERR: UserController --> userLogout() ', err);            
            next(err);
        }
    }
}