import { Router } from 'express'
import AuthRegisterController from '../../controllers/auth/register';
import AuthLoginController from '../../controllers/auth/login';


const app = Router();


// register route 
app.post('/register',AuthRegisterController);


// login route 
app.post('/login',AuthLoginController);




const AuthRouter = app;
export default AuthRouter   ;

