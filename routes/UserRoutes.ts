import {Router} from 'express';
import {registerUser} from '../controller/UserController';

const UserRouter = Router();

UserRouter.post('/register', registerUser);
export default UserRouter;
