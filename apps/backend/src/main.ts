import * as express from 'express';
import * as cors from 'cors';
import { userRouter } from './app/userRoutes';
import { authRouter } from './app/authRoutes';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { dbTest } from '@group1/node-util';

const port = process.env.port || 3333;

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});

server.on('error', console.error);

server.on('close', () => {
  prisma.$disconnect();
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
