import {NextFunction, Request, Response} from 'express';
import {verifyUserAuth} from './controller/users/Users';

const verifyUser = async (req: Request, res: Response) => {
  // User Auth
  try {
    const {username, password} = req.body;
    await verifyUserAuth(username, password);
  } catch (e) {
    /* handle error */
    res.status(500).json({status: false, message: e});
    return false;
  }

  return true;
};

// export async function authorize(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   let accessDenied = true;
//   // Login and Get req does not require auth
//   if (req.path === '/users/login' || req.method === 'GET') {
//     accessDenied = false;
//   } else if (req.path.split('/')[1] === 'wazirx') {
//     accessDenied = !(await verifyUser(req, res));
//     // accessDenied = true;
//   } else {
//     accessDenied = !verifyAdmin(req, res);
//   }

//   if (!accessDenied) {
//     next();
//   }
// }
