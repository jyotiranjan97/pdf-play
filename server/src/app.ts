import config from 'config';
import express from 'express';
import { documentRouter } from './routes/documentRoutes';

const app = express();
const port = config.get('server.port') as number;
const host = config.get('server.host') as string;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/documents', documentRouter);

app.listen(port, () => {
  console.log(`Server listening on port http://${host}:${port}`);
});
