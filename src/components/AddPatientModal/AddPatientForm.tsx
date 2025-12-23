
import { 
  PatientFormValues, 
  Gender 
} from "../../types/patients";
import GeneralForm, { GeneralFormField } from "../common/generalForm";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

const genderOptions = Object.values(Gender).map((v) => ({ value: v, label: v.toString() }));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const fields: GeneralFormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "ssn",
      label: "Social security number",
      type: "text",
      required: true,
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: true,
      validate: (value) => {
        // Simple date format check (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) {
          return "Date must be in YYYY-MM-DD format";
        }
        return null;
      },
    },
    {
      name: "occupation",
      label: "Occupation",
      type: "text",
      required: true,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      options: genderOptions,
      initialValue: Gender.Other,
    },
  ];

  const handleSubmit = (values: Record<string, any>) => {
    // Ensure all required fields are present and gender is cast to Gender enum
    const patient = {
      name: values.name,
      occupation: values.occupation,
      ssn: values.ssn,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender as Gender,
    } as PatientFormValues;
    onSubmit(patient);
  };

  return (
    <GeneralForm
      fields={fields}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel="Add"
      cancelLabel="Cancel"
    />
  );
};

export default AddPatientForm;