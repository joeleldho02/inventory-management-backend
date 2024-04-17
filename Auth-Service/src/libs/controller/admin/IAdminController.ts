import { NextFunction, Request, Response } from "express";

export interface IAdminController{
    adminLogin(req:Request, res:Response, next:NextFunction);
    adminLogout(req:Request, res:Response, next:NextFunction);
    resetPassword(req:Request, res:Response, next:NextFunction);
}