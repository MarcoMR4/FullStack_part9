
import diagnoses from "../../data/diagnoses";

const getDiagnoses = async () => {
  return Promise.resolve(diagnoses);
};

export default {
  getDiagnoses
};

