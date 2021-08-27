import * as express from 'express';
import { Message } from '@group1/api-interfaces';
import { PrismaClient } from '@prisma/client';
import { dbTest } from '@group1/node-util';

const greeting: Message = { message: 'espalier api works' };

const port = process.env.port || 3333;

const prisma = new PrismaClient();

const app = express();

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});

server.on('error', console.error);

server.on('close', () => {
  prisma.$disconnect();
});

app.get('/api', dbTest);
