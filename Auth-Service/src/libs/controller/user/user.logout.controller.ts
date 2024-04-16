import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class UserLogoutController{
    userLogout(req:Request, res:Response, next:NextFunction){
        try{
            res.clearCookie("userAccessToken");
            res.clearCookie("userRefreshToken");
            res.status(200).json({ status: true });
        } catch(err){
            console.log('ERR: UserLogoutController -->', err);            
            next(err);
        }
    }
}