import * as express from 'express';
import * as cors from 'cors';
import { userRouter } from './app/userRoutes';
import { authRouter } from './app/authRoutes';
// import cookieParser from 'cookie-parser';
import { AppConfiguration, prisma } from './app/config';

const port = AppConfiguration.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});

server.on('error', console.error);

server.on('close', () => {
  prisma.$disconnect();
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
