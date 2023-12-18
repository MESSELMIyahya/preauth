import { NextFunction , Request , Response } from "express";
import UserModel from "../../../models/user";
import createErr from 'http-errors';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../libs/jwt";


type FnTyp = (req:Request,res:Response,next:NextFunction) => Promise<any>;

// login user 

const AuthNewAccessTokenController : FnTyp  =  async(req,res,next) => {
    // verify if cookies exist 
    const cos = req.cookies ;
    if(!cos?.ac_to||!cos?.re_to) return next(createErr[401]('Unauthenticated'));
    try{
        // verify access token 
        const payload = await verifyRefreshToken(cos?.re_to);
        // if the token isn't valid  it'll throw an error "JWT-EXPIRED"

        // jwt auth 
        const accessToken  = generateAccessToken({email:payload.email,id:payload.id,username:payload.username});
        const refreshToken = generateRefreshToken({email:payload.email,id:payload.id,username:payload.username});

        // saving Access Token and Refresh Token as HTTPOnly cookie
        res.cookie('ac_to',accessToken,{httpOnly:true});
        res.cookie('re_to',refreshToken,{httpOnly:true});

        // send tokens 
        return res.json({id:payload.id,tokens:{acc:accessToken,ref:refreshToken}});
    }catch(err){
        return next(err)
    }

}


export default AuthNewAccessTokenController;
