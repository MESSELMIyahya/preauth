import jwt from 'jsonwebtoken';
import createError from 'http-errors'


type FunTyp =  (token:string)=> Promise<any>

const verifyAccessToken : FunTyp = async (token)=>  {
    return await new Promise((res,reg)=>{
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
            if(err){
                if(err.name == 'JsonWebTokenError') return reg(createError[401]('Unauthenticated'))
                else return reg(createError[401](err.message));
            }
            return res(user);
        })
    })
}


export default verifyAccessToken ;