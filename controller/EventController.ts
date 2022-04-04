import express from 'express';
import {verifyAdmin} from '../auth';
import {EventModel} from '../models/EventModel';
import {checkRequired} from '../Utility';

export async function createEvent(req: express.Request, res: express.Response) {
  try {
    verifyAdmin(req);
    checkRequired(req.body, [
      'name',
      'startTime',
      'maxUsersPerTeam',
      'minUsersPerTeam',
      'status',
    ]);
    const {name, startTime, endTime, maxUsersPerTeam, minUsersPerTeam, status} =
      req.body;

    const doc = new EventModel();
    doc.name = name;
    doc.startTime = startTime;
    doc.endTime = endTime;
    doc.maxUsersPerTeam = maxUsersPerTeam;
    doc.minUsersPerTeam = minUsersPerTeam;
    doc.status = status;
    await doc.save();

    res.status(200).json({status: true, message: 'Success'});
  } catch (e) {
    console.error('EventController::Failed o create event');
    res.status(500).json({status: false, message: 'Error'});
  }
}

export async function updateEvent(req: express.Request, res: express.Response) {
  try {
    verifyAdmin(req);
    checkRequired(req.body, ['name']);
    const {name, startTime, endTime, maxUsersPerTeam, minUsersPerTeam} =
      req.body;

    const doc = await EventModel.findOne({name: name});
    if (doc) {
      doc.name = name;
      startTime && (doc.startTime = startTime);
      endTime && (doc.endTime = endTime);
      maxUsersPerTeam && (doc.maxUsersPerTeam = maxUsersPerTeam);
      minUsersPerTeam && (doc.minUsersPerTeam = minUsersPerTeam);
      await doc.save();
    } else {
      throw 'Error Event not found';
    }

    res.status(200).json({status: true, message: 'Success'});
  } catch (e) {
    console.error('EventController::Failed o create event');
    res.status(500).json({status: false, message: 'Error'});
  }
}

export async function listEvents(_req: express.Request, res: express.Response) {
  try {
    const events = await EventModel.find({});
    res.status(200).json({status: true, data: events});
  } catch (e) {
    console.error('EventController::Failed to list events');
    res.status(500).json({status: false, message: 'Error'});
  }
}
