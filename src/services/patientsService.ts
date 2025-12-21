import axios from "axios";
import { 
  Patient,
  PatientFormValues 
} from "../types/patients";


import { apiBaseUrl } from "../constants";
import patients from "../../data/patients";

const getPatients = async () => {
  return Promise.resolve(
    patients.map(({ ssn, ...rest }) => rest)
  );
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getPatients, create
};

