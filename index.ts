import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {initDB} from './db/db';
import UserRouter from './routes/UserRoutes';
import EventRouter from './routes/EventRoutes';

dotenv.config();
initDB();

// import {authorize} from './auth';
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Authorise request
// app.use(authorize);

app.get('/', (_req, res) => res.send('Hello World!'));

app.use('/user', UserRouter);
app.use('/events', EventRouter);

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
