import {Router} from 'express';
import {loginUser, registerUser} from '../controller/UserController';

const UserRouter = Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);
export default UserRouter;
