import {Document, model, Schema} from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  branch: string;
  sem: number;
}

const userModel = new Schema<User>({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  branch: String,
  sem: Number,
});

export const UserModel = model<User>('user', userModel);
