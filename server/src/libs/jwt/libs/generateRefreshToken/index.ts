import jwt from 'jsonwebtoken'
import { JWTPayloadTyp } from '../..';


type FunTyp = (user:JWTPayloadTyp)=>string

const generateRefreshToken : FunTyp = (user)=>  {
    return jwt.sign(user,process.env.REFRESH_TOKEN,{expiresIn:'30m'});
}


export default generateRefreshToken ;