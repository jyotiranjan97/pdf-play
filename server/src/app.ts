import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import { documentRouter } from './routes/documentRoutes';
import { storageFactory } from './utils';

const app = express();
const port = config.get('server.port') as number;
const host = config.get('server.host') as string;

connectToDatabase();
registerStorageClient();

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/documents', documentRouter);

app.listen(port, () => {
  console.log(`Server listening on port http://${host}:${port}`);
});

// ==============================
// ***** Utility functions ******
// ==============================

async function connectToDatabase() {
  const connectionUrl = config.get('database.url') as string;
  const dbName = config.get('database.name') as string;
  try {
    await mongoose.connect(`${connectionUrl}/${dbName}`);
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

async function registerStorageClient() {
  const storageConfig = config.get('storage') as Record<string, string>;
  storageFactory.registerStorageService(storageConfig);
}
