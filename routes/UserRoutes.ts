import {Router} from 'express';
import {
  appointAsBranchCaptain,
  registerUser,
} from '../controller/UserController';

const UserRouter = Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/tocaptain', appointAsBranchCaptain);

export default UserRouter;
