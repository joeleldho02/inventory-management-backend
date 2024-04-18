import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { AdminUseCase } from "../../usecase/admin/admin.usecase";
import { IAdminController } from "./IAdminController";

@injectable()
export class AdminController implements IAdminController{
    constructor(@inject(INTERFACE_TYPE.AdminUseCase) private usecase:AdminUseCase){}

    async adminLogin(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body || !req.body.email || !req.body.password)
                throw new Error('Email and password is required!');
            const { email, password } = req.body;
            const response = await this.usecase.login(email, password);
            if(response.status){
                res.cookie("adminAccessToken", response.accessToken, {
                    maxAge: 60000,
                    httpOnly: true,
                    secure:true,
                    sameSite:"strict"
                });
                res.cookie("adminRefreshToken", response.refreshToken, {
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
            console.error('ERR: AdminController --> adminLogin() ', err);
            next(err);
        }
    }

    adminLogout(req:Request, res:Response, next:NextFunction){
        try{
            res.clearCookie("adminAccessToken");
            res.clearCookie("adminRefreshToken");
            res.status(200).json({ status: true });
        } catch(err){
            console.error('ERR: AdminController --> adminLogout()', err);            
            next(err);
        }
    }

    async resetPassword(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body || !req.body.oldPassword || !req.body.newPassword )
                throw new Error('Both old and new passwords are required!');
            if(!req.body.userId )
                throw new Error('User Id id required!');
            
            const { userId, oldPassword, newPassword } = req.body;
            const response = await this.usecase.resetPassword(userId, oldPassword, newPassword);
            if(response.status)
                return res.status(200).json(response);
            return res.status(500).json(response);
        } catch(err){
            console.error('ERR: AdminController --> resetPassword() ', err);
            next(err);
        }
    }

}