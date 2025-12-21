import express from 'express';
import patients from '../services/patientsService';

export const patientsRouter = express.Router();

patientsRouter.get('/', async (_req, res) => {
  const data = await patients.getPatients();
  res.json(data);
})

patientsRouter.get('/:id', async (_req, res) => {
  const data = await patients.getPatientById(_req.params.id);
  if (data) {
    res.json(data);
  } else {
    res.status(404).send(`Patient with id ${_req.params.id} not found`);
  }
});

patientsRouter.post('/', (_req, res) => {
  res.send('Saving a patient!');
})

