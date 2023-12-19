import { NextFunction , Request , Response } from "express";
import UserModel from "../../../models/user";
import createErr from 'http-errors';

type FnTyp = (req:Request,res:Response,next:NextFunction) => Promise<any>;

// logout user 
const AuthLogoutController : FnTyp  =  async(req,res,next) => {
    // verify if cookies exist 
    const cos = req.cookies ;
    if(!cos?.ac_to||!cos?.re_to) return next(createErr[401]('Unauthenticated'));
    // deleting cookies 
    res.clearCookie('ac_to',{httpOnly:true});
    res.clearCookie('re_to',{httpOnly:true});
    return res.json({Unauthenticated:true});
}

export default AuthLogoutController;
