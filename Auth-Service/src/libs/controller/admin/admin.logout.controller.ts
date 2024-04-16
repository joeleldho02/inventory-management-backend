import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class AdminLogoutController{
    adminLogout(req:Request, res:Response, next:NextFunction){
        try{
            res.clearCookie("adminAccessToken");
            res.clearCookie("adminRefreshToken");
            res.status(200).json({ status: true });
        } catch(err){
            console.log('ERR: AdminLogoutController -->', err);            
            next(err);
        }
    }
}