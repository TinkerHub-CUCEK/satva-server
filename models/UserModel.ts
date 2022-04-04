import {Document, model, Schema} from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  branch: string;
  sem: number;
  isVerified: boolean;
  otp: string;
  isCaptain: boolean;
}

const userModel = new Schema<User>({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: String,
  branch: String,
  sem: Number,
  isCaptain: Boolean,
});

export const UserModel = model<User>('user', userModel);
