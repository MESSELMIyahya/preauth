// importing JWT's libs 
import verifyAccessToken from "./libs/verifyAccessToken";
import verifyRefreshToken from "./libs/verifyRefreshToken";
import generateAccessToken from "./libs/generateAccessToken";
import generateRefreshToken from "./libs/generateRefreshToken";

export interface JWTPayloadTyp {
    username:string;
    email:string;
    id:string;
}



// export functions
export {verifyAccessToken,verifyRefreshToken,generateAccessToken,generateRefreshToken}