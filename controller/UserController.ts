import fetch from 'cross-fetch';
import {randomInt} from 'crypto';
import express from 'express';
import {verifyAdmin} from '../auth';
import {UserModel} from '../models/UserModel';
import {checkRequired, hashString, sendMail} from '../Utility';

export async function registerUser(
  req: express.Request,
  res: express.Response,
) {
  try {
    checkRequired(req.body, ['name', 'email', 'sem', 'branch', 'password']);
    const {name, email, password, sem, branch} = req.body;

    const doc = new UserModel();
    doc.name = name;
    doc.sem = sem;
    doc.branch = branch;
    doc.email = email;
    doc.password = hashString(password);
    doc.otp = String(randomInt(1000, 9999));

    await sendMail(email, 'OTP for Satva', doc.otp);
    await doc.save();
    res.status(200).json({status: true, message: 'User Regissterd'});
  } catch (e) {
    console.error('UserController::Failed to registerUser', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}

export async function appointAsBranchCaptain(
  req: express.Request,
  res: express.Response,
) {
  try {
    verifyAdmin(req);
    checkRequired(req.body, ['email', 'branch']);
    const {email, branch} = req.body;
    const user = await UserModel.findOne({email: email});
    const existingCaptain = await UserModel.findOne({
      branch: branch,
      isCaptain: true,
    });

    if (user) {
      user.isCaptain = true;
      if (existingCaptain) {
        existingCaptain.isCaptain = false;
        await existingCaptain.save();
      }
      await user.save();
    } else {
      throw `User with email ${email} not found`;
    }
    res.status(200).json({status: true, message: 'success'});
  } catch (e) {
    console.error('UserController::Failed to registerUser', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}
