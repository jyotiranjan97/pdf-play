import express from 'express';
import { documentRouter } from './routes/documentRoutes';

const app = express();
const port = process.env.port || 3000;

app.use('/api/v1/documents', documentRouter);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
