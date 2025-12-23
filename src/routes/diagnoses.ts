import express from 'express';

export const diagnosesRouter = express.Router();

import diagnosesService from '../services/diagnosesService';

// Get diagnoses list
diagnosesRouter.get('/', async (_req, res) => {
    const data = await diagnosesService.getDiagnoses();
    res.json(data);
})

// Add new diagnose to diagnoses list
diagnosesRouter.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
})
