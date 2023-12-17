import jwt from 'jsonwebtoken'
import { JWTPayloadTyp } from '../..';


type FunTyp = (user:JWTPayloadTyp)=>string;


const generateAccessToken : FunTyp = (user)=> {
    return jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'5m'});
}


export default generateAccessToken;