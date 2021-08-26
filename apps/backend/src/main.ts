import * as express from 'express';
import { Message } from '@group1/api-interfaces';

const greeting: Message = { message: 'espalier api works' };

const port = process.env.port || 3333;

const app = express();

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});

server.on('error', console.error);

app.get('/api', (req, res) => {
  res.send(greeting);
});
