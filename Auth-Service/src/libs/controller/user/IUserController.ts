import { NextFunction, Request, Response } from "express";

export interface IUserController{
    addUser(userData:any, password:string);
    updateStatus(req:Request, res:Response, next:NextFunction);
    resetPassword(req:Request, res:Response, next:NextFunction);
    userLogin(req:Request, res:Response, next:NextFunction);
    userLogout(req:Request, res:Response, next:NextFunction);
}