import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { NextFunction, Request, Response } from "express";
import { AdminLoginUseCase } from "../../usecase/admin/admin.login.usecase";

@injectable()
export class AdminLoginController{
    constructor(@inject(INTERFACE_TYPE.AdminLoginUseCase) private usecase:AdminLoginUseCase){}

    async adminLogin(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body || !req.body.email || !req.body.password)
                throw new Error('Email and password is required!');
            const { email, password } = req.body;
            const response = await this.usecase.execute(email, password);
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
            console.log('ERR: AdminLoginController --> execute() ', err);
            next(err);
        }
    }
}