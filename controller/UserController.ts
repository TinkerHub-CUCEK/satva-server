import fetch from 'cross-fetch';
import express from 'express';
import {UserModel} from '../models/UserModel';
import {checkRequired} from '../Utility';

export async function registerUser(
  req: express.Request,
  res: express.Response,
) {
  try {
    checkRequired(req.body, ['name', 'email', 'password']);
    const {name, email, password} = req.body;

    const doc = new UserModel();
    doc.name = name;
    doc.email = email;
    doc.password = password;
    await doc.save();

    res.status(200).json({status: true, message: 'User Regissterd'});
  } catch (e) {
    console.error('UserController::Failed to registerUser', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}
