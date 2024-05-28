import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { documentRouter } from './routes/documentRoutes';
import swaggerConfig from './swagger-output.json';

const app = express();
const port = config.get('server.port') as number;
const host = config.get('server.host') as string;
const isSwaggerEnabled = config.get('server.isSwaggerEnabled') as boolean;

connectToDatabase();

app.get('/', (_, res) => {
  // #swagger.ignore = true
  res.redirect('/docs');
});

app.use(bodyParser.json());

if (isSwaggerEnabled) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
}

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
