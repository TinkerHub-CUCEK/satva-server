import express from 'express';
import {verifyUser} from '../auth';
import {EventRegModel} from '../models/EventRegModel';
import {checkRequired} from '../Utility';

export async function addRegistraion(
  req: express.Request,
  res: express.Response,
) {
  try {
    verifyUser(req);
    checkRequired(req.body, ['eventId', 'userId', 'sem', 'branch']);
    const {eventId, userId, sem, branch} = req.body;

    const doc = new EventRegModel();
    doc.eventId = eventId;
    doc.userId = userId;
    doc.sem = sem;
    doc.branch = branch;
    await doc.save();

    res.status(200).json({status: true, message: 'Success'});
  } catch (e) {
    console.error('EventRegistration::Failed to register event');
    res.status(500).json({status: false, message: 'Error'});
  }
}

export async function listRegistraions(
  req: express.Request,
  res: express.Response,
) {
  try {
    checkRequired(req.body, ['eventId']);
    const {eventId} = req.body;

    const registrations = await EventRegModel.find({eventId: eventId});
    res.status(200).json({status: true, data: registrations});
  } catch (e) {
    console.error('EventRegistration::Failed to list registrations');
    res.status(500).json({status: false, message: 'Error'});
  }
}

// export async function deleteRegistration(
//   req: express.Request,
//   res: express.Response,
// ) {
//   try {
//     checkRequired(req.body, ['name']);
//     const {name, startTime, endTime, maxUsersPerTeam, minUsersPerTeam} =
//       req.body;

//     const doc = await EventModel.findOne({name: name});
//     if (doc) {
//       doc.name = name;
//       startTime && (doc.startTime = startTime);
//       endTime && (doc.endTime = endTime);
//       maxUsersPerTeam && (doc.maxUsersPerTeam = maxUsersPerTeam);
//       minUsersPerTeam && (doc.minUsersPerTeam = minUsersPerTeam);
//       await doc.save();
//     } else {
//       throw 'Error Event not found';
//     }

//     res.status(200).json({status: true, message: 'Success'});
//   } catch (e) {
//     console.error('EventController::Failed o create event');
//     res.status(500).json({status: false, message: 'Error'});
//   }
// }
