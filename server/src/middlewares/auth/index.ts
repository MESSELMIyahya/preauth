import { Response,Request,NextFunction } from "express";
import createErr from 'http-errors';
import { verifyAccessToken } from "../../libs/jwt";
import UserModel from "../../models/user";
import { JWTPayloadTyp } from "../../libs/jwt";


interface ReqTyp extends Request {
    user?:JWTPayloadTyp
}

type FnTyp = (req:ReqTyp,res:Response,next:NextFunction) => Promise<any>;

// login user 

const AuthVerifierMiddleware : FnTyp  =  async(req,res,next) => {
    // verify if cookies exist 
    const cos = req.cookies ;

    if(!cos?.ac_to||!cos?.re_to) return next(createErr[401]('Unauthenticated'));
    try{
        // verify access token 
        const payload = await verifyAccessToken(cos?.ac_to);
        // if the token isn't valid  it'll throw an error "JWT-EXPIRED"

        // ser the user in req 
        req.user = payload ;
        return next();
    }catch(err){
        return next(err);
    }
}

export default AuthVerifierMiddleware;