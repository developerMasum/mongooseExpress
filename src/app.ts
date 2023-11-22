import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
// import { studentRoutes } from './app/modules/student/student.route';

// parsers
app.use(express.json());
app.use(cors());

// app routes
app.use('/api/v1/students', StudentRoutes)

const getController =  (req: Request, res: Response) => {
  res.send('Hello World!');
} 
app.get('/',getController);
export default app;
