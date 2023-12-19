import { Router } from 'express'
import passport from 'passport';
import OAuthGoogleLoginController from '../../../controllers/auth/passport/google';
import { PassportConfig, PassportGoogleStrategyConfig } from '../../../libs/passport';


// Passport config 
PassportConfig();
// Passport Google config 
PassportGoogleStrategyConfig();



const app = Router();


// google login route 
app.get('/google/login',passport.authenticate('google',{scope:['email','profile']}));
// google callback route
app.get('/google/callback',passport.authenticate('google',{session:false,failureRedirect:`${process.env.SERVER_URL}/auth/failed`}),OAuthGoogleLoginController);




const OAuthRouter = app;
export default OAuthRouter ;

