import {Router} from 'express';
import {
  createEvent,
  listEvents,
  updateEvent,
} from '../controller/EventController';
import {
  addRegistraion,
  listRegistraions,
  updateRegistration,
} from '../controller/EventRegController';

const EventRouter = Router();

EventRouter.post('/create', createEvent);
EventRouter.post('/update', updateEvent);
EventRouter.post('/register', addRegistraion);
EventRouter.post('/updateregistraion', updateRegistration);
EventRouter.get('/listevents', listEvents);
EventRouter.post('/listregistrations', listRegistraions);
// EventRouter.delete('/register', addRegistraion);

export default EventRouter;
