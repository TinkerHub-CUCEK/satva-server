import express from 'express';
import {verifyUser} from '../auth';
import {Event, EventModel} from '../models/EventModel';
import {EventRegModel, Participant} from '../models/EventRegModel';
import {checkRequired} from '../Utility';

async function findEvent(eventId: string) {
  const event = await EventModel.findOne({_id: eventId});
  if (!event) {
    throw 'Invalid Event id';
  }
  return event;
}

async function checkMaxTeamsPerBranch(event: Event, branch: string) {
  const registrations = await EventRegModel.find({
    eventId: event._id,
    branch: branch,
  });
  const teamCount = registrations.length;

  if (teamCount >= event.maxTeamsPerBranch) {
    throw `Max Team Per Branch Reached. Max allowed = ${event.maxTeamsPerBranch}`;
  }
}

function checkMaxUsersPerTeam(event: Event, count: number) {
  if (count > event.maxUsersPerTeam) {
    throw `Max Members Per Team Reached. Max allowed = ${event.maxUsersPerTeam}`;
  }

  if (count == 0) {
    throw 'Atleast 1 participant is required';
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
      'branch',
      'captainMail',
      'branchTeamId',
      'participants',
    ]);

    const {eventId, branch, captainMail, branchTeamId, participants} = req.body;

    const event = await findEvent(eventId);
    await checkMaxTeamsPerBranch(event, branch);
    checkMaxUsersPerTeam(event, participants.length);

    participants.forEach((p: Participant) =>
      checkRequired(p, [
        'sem',
        'username',
        'registernumber',
        'phone',
        'email',
        'paymentDone',
      ]),
    );

    const doc = new EventRegModel();
    doc.eventId = eventId;
    doc.branch = branch;
    doc.captainMail = captainMail;
    doc.branchTeamId = branchTeamId;
    doc.participants = participants;
    await doc.save();

    res.status(200).json({status: true, message: 'Success'});
  } catch (e) {
    console.error('EventRegistration::Failed to register event');
    res.status(500).json({status: false, message: 'Error' + e});
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
    res.status(500).json({status: false, message: 'Error' + e});
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
