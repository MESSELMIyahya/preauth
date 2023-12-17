import Express from 'express';
import Dotenv from 'dotenv';
import Cors from 'cors';
import connectToDB from './libs/db';
import cookieParser from 'cookie-parser';
import ErrorControllerHandler from './controllers/errorHandler';
import AuthRouter from './routes/auth';
import AuthVerifierMiddleware from './middlewares/auth';



// dotenv config 
Dotenv.config();


// express app 
const app = Express();

// express config
app.use(Express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(Express.json());

// CORS config 
app.use(Cors());



// ## Routes
// @@ AuthRoute
app.use('/auth',AuthRouter);




// #test route
import createErr from 'http-errors';
import { Request } from 'express';
interface ReqTyp extends Request {
    user : any // or user type 
}
app.get('/posts',AuthVerifierMiddleware,(req:ReqTyp,res,next)=>{
    if(!req.user) return next(createErr[400]('unauthenticated'))
    res.json({message:`Hi ${req?.user.email}`})
})


// Error Handler 
app.use(ErrorControllerHandler);


// connect to mongodb
connectToDB();




// listening for server on prot 5000
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on http//localhost:${PORT}`);

})
