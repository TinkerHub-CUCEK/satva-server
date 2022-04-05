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

    await doc.save();
    await sendMail(email, 'OTP for Satva', doc.otp);
    res.status(200).json({status: true, message: 'User Regissterd'});
  } catch (e) {
    console.error('UserController::Failed to registerUser', e);
    res.status(500).json({status: false, message: 'Error' + e});
  }
}

export async function resendOTP(req: express.Request, res: express.Response) {
  try {
    checkRequired(req.body, ['email']);
    const {email, otp} = req.body;
    const user = await UserModel.findOne({email: email});
    if (user) {
      user.otp = String(randomInt(1000, 9999));
      await sendMail(email, 'OTP for Satva', user.otp);
      await user.save();
    } else {
      throw `User Not found`;
    }
    res.status(200).json({status: true, message: 'success'});
  } catch (e) {
    console.error('UserController::Failed to verifyOtp', e);
    res.status(500).json({status: false, message: 'Error' + e});
  }
}

export async function verifyOtp(req: express.Request, res: express.Response) {
  try {
    checkRequired(req.body, ['email', 'otp']);
    const {email, otp} = req.body;
    const user = await UserModel.findOne({email: email, otp: otp});
    if (user) {
      user.isVerified = true;
      await user.save();
    } else {
      throw `Invalid Otp`;
    }
    res.status(200).json({status: true, message: 'success'});
  } catch (e) {
    console.error('UserController::Failed to verifyOtp', e);
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
