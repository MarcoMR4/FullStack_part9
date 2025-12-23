import { v4 as uuidv4 } from 'uuid';
import { 
  Patient,
  PatientFormValues ,
  Entry
} from "../types/patients";
import patients from "../../data/patients";

const getPatients = async () => {
  return Promise.resolve(
    patients.map(({ ssn, ...rest }) => rest)
  );
};

const getPatientById = async (id: string) => {
  const patient = patients.find(p => p.id === id);
  if (!patient) 
    return Promise.resolve(null);
  return Promise.resolve(patient);    
}

const addPatient = async (object: PatientFormValues) => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...object,
    entries: []
  };
  (patients as Patient[]).push(newPatient);
  return newPatient;
};

const addPatientEntry = async (idPatient: string, entry: Entry) => {
  const patient = patients.find(p => p.id === idPatient);
  if (!patient) 
    return Promise.resolve(null);
  patient.entries.push(entry);
  return Promise.resolve(patient);    
};

export default {
  getPatients, 
  getPatientById,
  addPatient,
  addPatientEntry
};

