import express from 'express';
import {verifyAdmin} from '../auth';
import {UserModel} from '../models/UserModel';
import {checkRequired, hashString} from '../Utility';

export async function registerUser(
  req: express.Request,
  res: express.Response,
) {
  try {
    verifyAdmin(req);
    checkRequired(req.body, ['name', 'email', 'sem', 'branch', 'password']);
    const {name, email, password, sem, branch} = req.body;

    const doc = new UserModel();
    doc.name = name;
    doc.sem = sem;
    doc.branch = branch;
    doc.email = email;
    doc.password = hashString(password);

    await doc.save();
    res.status(200).json({status: true, message: 'User Regissterd'});
  } catch (e) {
    console.error('UserController::Failed to registerUser', e);
    res.status(500).json({status: false, message: 'Error' + e});
  }
}

export async function loginUser(req: express.Request, res: express.Response) {
  try {
    checkRequired(req.body, ['email', 'password']);
    const {email, password} = req.body;
    const user = await UserModel.findOne({
      email: email,
      password: hashString(password),
    });
    if (!user) {
      throw 'Invalid credentials';
    }
    res.status(200).json({status: true, message: 'Login Success'});
  } catch (e) {
    res.status(500).json({status: false, message: 'Error' + e});
  }
}
