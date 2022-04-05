import {Document, model, Schema} from 'mongoose';

export interface EventRegistration extends Document {
  eventId: string;
  branch: string;
  sem: number;
  username: string;
  registernumber: string;
  phone: string;
  email: string;
  paymentDone: boolean;
  captainMail: string;
}

const eventModel = new Schema<EventRegistration>({
  eventId: String,
  branch: String,
  sem: Number,
  username: String,
  registernumber: String,
  phone: String,
  email: String,
  paymentDone: Boolean,
  captainMail: String,
});

export const EventRegModel = model<EventRegistration>('eventreg', eventModel);
