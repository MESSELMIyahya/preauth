import Express from 'express';
import Dotenv from 'dotenv';
import Cors from 'cors';
import connectToDB from './libs/db';
import ExpressCookies from 'express-cookie';
import ErrorControllerHandler from './controllers/errorHandler';
import AuthRouter from './routes/auth';



// dotenv config 
Dotenv.config();


// express app 
const app = Express();

// express config
app.use(Express.urlencoded({extended:true}));
app.use(ExpressCookies());
app.use(Express.json());

// CORS config 
app.use(Cors());



// ## Routes
// @@ AuthRoute
app.use('/auth',AuthRouter);




// #test route
// app.get('/',async(_,__,next)=>{
//     const createError = await import('http-errors')
//   return next(createError[500]('body not found'));
// });

// import createError from 'http-errors'
// import { generateAccessToken , generateRefreshToken, verifyAccessToken, verifyRefreshToken } from './libs/jwt';

// app.post('/ac',async(req,res,next)=>{
//   const { email,name } = req.body;
//   if(!email||!name) return next(createError[400]('body data not provided') )

//   const token = generateAccessToken({email,name});
//   const tokenR = generateRefreshToken({email,name});

//   res.json({acc:token,ref:tokenR});
// });

// app.post('/ch_ac',async(req,res,next)=>{
//   const { token } = req.body;
//   if(!token) return next(createError[400]('jwt token not provided') );
//   try{  
//     const user = await verifyRefreshToken(token);
//     res.json({valid:true,data:user})
//   }catch(err){
//     next(err)
//   }
// });



// Error Handler 
app.use(ErrorControllerHandler);


// connect to mongodb
connectToDB();




// listening for server on prot 5000
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on http//localhost:${PORT}`);

})
