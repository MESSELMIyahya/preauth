import { Router } from 'express'
import AuthRegisterController from '../../controllers/auth/register';
import AuthLoginController from '../../controllers/auth/login';
import AuthNewAccessTokenController from '../../controllers/auth/newAccessToken';


const app = Router();


// register route 
app.post('/register',AuthRegisterController);

// login route 
app.post('/login',AuthLoginController);

// generate new access token 
app.post('/new-access-token',AuthNewAccessTokenController);




const AuthRouter = app;
export default AuthRouter   ;

