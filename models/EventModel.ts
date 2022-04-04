import {Document, model, Schema} from 'mongoose';

export interface Event extends Document {
  name: string;
  startTime: Date;
  endTime: Date;
  maxUsersPerTeam: number;
  minUsersPerTeam: number;
  status: string;
}

const eventModel = new Schema<Event>({
  name: {
    type: String,
    unique: true,
  },
  startTime: Date,
  endTime: Date,
  maxUsersPerTeam: Number,
  minUsersPerTeam: Number,
  status: String,
});

export const EventModel = model<Event>('event', eventModel);
