import {Document, model, Schema} from 'mongoose';

export interface Participant {
  sem: number;
  username: string;
  registernumber: string;
  phone: string;
  email: string;
  paymentDone: boolean;
}

export interface EventRegistration extends Document {
  eventId: string;
  branch: string;
  captainMail: string;
  branchTeamId: number;
  participants: Participant[];
}

const eventModel = new Schema<EventRegistration>({
  eventId: String,
  branch: String,
  captainMail: String,
  branchTeamId: Number,
  participants: [],
});

export const EventRegModel = model<EventRegistration>('eventreg', eventModel);
