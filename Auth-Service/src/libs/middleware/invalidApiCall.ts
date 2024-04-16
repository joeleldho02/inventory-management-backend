import { NextFunction, Request, Response } from "express";

function invalidApiCall(req:Request, res:Response, next:NextFunction) {
    const err = {
        statusCode: 404,
        message: 'Not found'
    }
    next(err);
}

export default invalidApiCall;