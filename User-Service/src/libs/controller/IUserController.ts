import { NextFunction, Request, Response } from "express";

export interface IUserController{
    addUser(req:Request, res:Response, next:NextFunction);
    updateUser(req:Request, res:Response, next:NextFunction);
    updateStatus(data:Record<string, string>);
    getUser(req:Request, res:Response, next:NextFunction);
    getUsers(req:Request, res:Response, next:NextFunction);
    deleteUser(req:Request, res:Response, next:NextFunction);
}