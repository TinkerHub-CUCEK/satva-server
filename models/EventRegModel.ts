import {Document, model, Schema} from 'mongoose';

export interface EventRegistration extends Document {
  eventId: string;
  userId: string;
  branch: string;
  sem: number;
}

const eventModel = new Schema<EventRegistration>({
  eventId: String,
  userId: String,
  branch: String,
  sem: Number,
});

export const EventRegModel = model<EventRegistration>('eventreg', eventModel);
