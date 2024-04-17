import { Request, Response} from "express";

const ErrorHandler = (err:{statusCode:number, message:string, stack:string}, req:Request, res:Response) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    console.log(`Error:${errStatus} -->> ${errMsg} -->> ${err?.stack}`);
    
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg
    });
}

export default ErrorHandler;