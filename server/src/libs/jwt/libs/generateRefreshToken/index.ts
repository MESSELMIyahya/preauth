import jwt from 'jsonwebtoken'
import { JWTPayloadTyp } from '../..';


type FunTyp = (user:any)=>string

const generateRefreshToken : FunTyp = (user:JWTPayloadTyp)=>  {
    return jwt.sign(user,process.env.REFRESH_TOKEN,{expiresIn:'30m'});
}


export default generateRefreshToken ;