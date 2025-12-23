import express from 'express';

export const diaryRouter = express.Router();


import dairyService from '../services/dairyService.ts';

// Get diaries list
diaryRouter.get('/', (_req, res) => {
  res.send(dairyService.getNonSensitiveEntries());
})

// Add new diary
diaryRouter.post('/', (_req, res) => {
  res.send('Saving a diary!');
})
