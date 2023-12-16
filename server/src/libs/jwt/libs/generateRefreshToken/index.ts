import jwt from 'jsonwebtoken'


type FunTyp = (user:any)=>string

const generateRefreshToken : FunTyp = (user)=>  {
    return jwt.sign(user,process.env.REFRESH_TOKEN,{expiresIn:'30m'});
}


export default generateRefreshToken ;