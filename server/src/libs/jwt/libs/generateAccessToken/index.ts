import jwt from 'jsonwebtoken'


type FunTyp = (user:any)=>string

const generateAccessToken : FunTyp = (user)=> {
    return jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'5m'});
}


export default generateAccessToken;