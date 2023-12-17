import { Router } from 'express'
import AuthRegisterController from '../../controllers/auth/register';


const app = Router();


// register route 
app.post('/register',AuthRegisterController)








const AuthRouter = app;
export default AuthRouter   ;

