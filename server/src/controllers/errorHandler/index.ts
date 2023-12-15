import { Response , Request  , NextFunction } from "express";


type FnTyp = (err:{status:number,message:string},req:Request,res:Response,next:NextFunction) => any;

const ErrorControllerHandler : FnTyp  =  (err,req,res,next) => {
    // send error back as json 
    res.status(err.status||500).json({status:err.status||500,message:err.message})
}



export default ErrorControllerHandler; 