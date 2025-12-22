import { v4 as uuidv4 } from 'uuid';
import { 
  Patient,
  PatientFormValues 
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

const create = async (object: PatientFormValues) => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...object,
    entries: []
  };
  (patients as Patient[]).push(newPatient);
  return newPatient;
};

export default {
  getPatients, 
  getPatientById,
  create
};

