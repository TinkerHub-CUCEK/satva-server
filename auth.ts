import {Request} from 'express';
import {UserModel} from './models/UserModel';
import {hashString} from './Utility';

export const verifyCaptain = async (req: Request) => {
  try {
    const {username, password} = req.body;
    const usr = await UserModel.findOne({
      name: username,
      password: hashString(password),
      isCaptain: true,
    });

    if (!usr) {
      throw 'User not captain';
    }
  } catch (e) {
    console.error('auth::Error in verifyCaptain', e);
    throw e;
  }
};

export const verifyAdmin = (req: Request) => {
  const {adminPass} = req.body;
  if (adminPass !== process.env.PASS) {
    throw 'Wrong Admin Password';
  }
};
