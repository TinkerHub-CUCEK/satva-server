import {Request} from 'express';
import {UserModel} from './models/UserModel';
import {hashString} from './Utility';

export const verifyUser = async (req: Request) => {
  try {
    const {username, password} = req.body;
    const usr = await UserModel.findOne({
      name: username,
      password: hashString(password),
    });

    if (!usr) {
      throw 'Invalid password or username';
    }
  } catch (e) {
    console.error('auth::Error in verifyUser', e);
    throw e;
  }
};

export const verifyAdmin = (req: Request) => {
  const {adminpass} = req.body;
  if (adminpass !== process.env.PASS) {
    throw 'Wrong Admin Password';
  }
};
