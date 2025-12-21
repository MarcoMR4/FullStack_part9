import express from 'express';
import patientsService from '../services/patientsService';

export const patientsRouter = express.Router();

patientsRouter.get('/', async (_req, res) => {
  const data = await patientsService.getPatients();
  res.json(data);
});

patientsRouter.get('/:id', async (req, res) => {
  const data = await patientsService.getPatientById(req.params.id);
  if (data) {
    res.json(data);
  } else {
    res.status(404).send(`Patient with id ${req.params.id} not found`);
  }
});

patientsRouter.post('/', async (req, res) => {
  try {
    const newPatient = await patientsService.create(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: 'Invalid patient data' });
  }
});

