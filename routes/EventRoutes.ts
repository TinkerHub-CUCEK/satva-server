import {Router} from 'express';
import {
  createEvent,
  listEvents,
  updateEvent,
} from '../controller/EventController';
import {
  addRegistraion,
  listRegistraions,
} from '../controller/EventRegController';

const EventRouter = Router();

EventRouter.post('/create', createEvent);
EventRouter.post('/update', updateEvent);
EventRouter.post('/register', addRegistraion);
EventRouter.get('/listevents', listEvents);
EventRouter.get('/listregistrations', listRegistraions);
// EventRouter.delete('/register', addRegistraion);

export default EventRouter;
