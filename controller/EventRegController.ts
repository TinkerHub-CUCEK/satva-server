import express from 'express';
import {verifyUser} from '../auth';
import {Event, EventModel} from '../models/EventModel';
import {EventRegModel} from '../models/EventRegModel';
import {checkRequired} from '../Utility';

async function findEvent(eventId: string) {
  const event = await EventModel.findOne({_id: eventId});
  if (!event) {
    throw 'Invalid Event id';
  }
  return event;
}

async function checkEventRegistrationLimit(event: Event, branch: string) {
  const registrations = await EventRegModel.find({
    eventId: event._id,
    branch: branch,
  });
  const count = registrations.length;

  if (count >= event.maxUsersPerTeam) {
    throw 'Error max participants limit reached';
  }
}

export async function addRegistraion(
  req: express.Request,
  res: express.Response,
) {
  try {
    verifyUser(req);
    checkRequired(req.body, [
      'eventId',
      'username',
      'registernumber',
      'phone',
      'branch',
      'sem',
      'email',
      'paymentDone',
      'captainMail',
    ]);

    const {
      eventId,
      username,
      registernumber,
      phone,
      branch,
      sem,
      email,
      paymentDone,
      captainMail,
    } = req.body;

    const event = await findEvent(eventId);
    await checkEventRegistrationLimit(event, branch);

    const doc = new EventRegModel();
    doc.eventId = eventId;
    doc.username = username;
    doc.registernumber = registernumber;
    doc.phone = phone;
    doc.branch = branch;
    doc.sem = sem;
    doc.email = email;
    doc.paymentDone = paymentDone;
    doc.captainMail = captainMail;
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
