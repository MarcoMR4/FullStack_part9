import express from 'express';
import { diaryRouter } from './routes/diaries.ts';
import { patientsRouter } from './routes/patients.ts';
import { diagnosesRouter } from './routes/diagnoses.ts';
import cors from 'cors';

/**
 * Main entry point for the Express API server.
 * This module initializes the application, configures middleware such as CORS and JSON parsing,
 * and sets up routing for diaries, patients, and diagnoses.
 */

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

/**
 * Root endpoint for the API.
 * Responds with a greeting message.
 */
app.get('/', (_req, res) => {
  res.send('Hello World from Express + TypeScript mini server! ;)');
});

/**
 * Ping endpoint for health checks.
 * Responds with 'pong' and logs a message to the console.
 */
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.use('/api/patients', patientsRouter);

app.use('/api/diagnoses', diagnosesRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});