import {Document, model, Schema} from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

const userModel = new Schema<User>({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

export const UserModel = model<User>('user', userModel);
