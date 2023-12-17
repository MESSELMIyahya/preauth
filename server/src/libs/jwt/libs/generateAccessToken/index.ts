import jwt from 'jsonwebtoken'
import { JWTPayloadTyp } from '../..';


type FunTyp = (user:any)=>string;


const generateAccessToken : FunTyp = (user:JWTPayloadTyp)=> {
    return jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'5m'});
}


export default generateAccessToken;