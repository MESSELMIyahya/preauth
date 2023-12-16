import jwt from 'jsonwebtoken';
import createError from 'http-errors'


type FunTyp =  (token:string)=> Promise<any>

const verifyRefreshToken : FunTyp = async (token)=> {
    return await new Promise((res,reg)=>{
        jwt.verify(token,process.env.REFRESH_TOKEN,(err,user)=>{
            if(err){
                if(err.name == 'JsonWebTokenError') return reg(createError[401]('Unauthenticated'))
                else return reg(createError[401](err.message));
            }
            return res(user);
        })
    })
}


export default verifyRefreshToken ;