import express from 'express';
import patientsService from '../services/patientsService';

export const patientsRouter = express.Router();

// Get patients list
patientsRouter.get('/', async (_req, res) => {
  const data = await patientsService.getPatients();
  res.json(data);
});

// Get patient by id
patientsRouter.get('/:id', async (req, res) => {
  const data = await patientsService.getPatientById(req.params.id);
  if (data) {
    res.json(data);
  } else {
    res.status(404).send(`Patient with id ${req.params.id} not found`);
  }
});

// Add new patient
patientsRouter.post('/', async (req, res) => {
  try {
    const newPatient = await patientsService.addPatient(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: 'Invalid patient data' });
  }
});

// Add entry to patient
patientsRouter.post('/:id/entries', async (req, res) => {
  try {
    const newPatientEntry = await patientsService.addPatientEntry(req.params.id, req.body);
    if (!newPatientEntry) {
      res.status(404).send(`Patient with id ${req.params.id} not found`);
    }
    res.status(201).json(newPatientEntry);
  } catch (error) {
    res.status(400).json({ error: 'Invalid patient data' });
  }
});


