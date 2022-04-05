import {Router} from 'express';
import {
  appointAsBranchCaptain,
  registerUser,
  resendOTP,
  verifyOtp,
} from '../controller/UserController';

const UserRouter = Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/resendotp', resendOTP);
UserRouter.post('/verifyotp', verifyOtp);
UserRouter.post('/tocaptain', appointAsBranchCaptain);

export default UserRouter;
