import { inject, injectable } from "inversify";
import { UserLoginUseCase } from "../../usecase/user/user.login.usecase";
import { INTERFACE_TYPE } from "../../../utils/interface/interface.types";
import { NextFunction, Request, Response } from "express";

@injectable()
export class UserLoginController{
    constructor(@inject(INTERFACE_TYPE.UserLoginUseCase) private usecase:UserLoginUseCase){}

    async userLogin(req:Request, res:Response, next:NextFunction){
        try{
            if(!req.body || !req.body.email || !req.body.password)
                throw new Error('Email and password is required!');
            const { email, password } = req.body;
            const response = await this.usecase.execute(email, password);
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
            console.log('ERR: UserLoginController --> execute() ', err);
            next(err);
        }
    }
}