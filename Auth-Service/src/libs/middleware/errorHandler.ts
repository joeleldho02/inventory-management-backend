import { Request, Response } from "express";

const ErrorHandler = (err:any, req:Request, res:Response) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    console.log(`Error:${errStatus} -->> ${errMsg} -->> ${err?.stack}`);
    
    res.status(errStatus).json({
        status: false,
        message: errMsg
    });
}

export default ErrorHandler;