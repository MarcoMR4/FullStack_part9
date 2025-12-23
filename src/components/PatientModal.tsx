import React, 
{ 
  useEffect, 
  useState 
} from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";

import { 
  Patient, 
  Gender
} from "../types/patients";

import {
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions, 
  Button, 
  Typography, 
  CircularProgress,
  Divider
} from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import PatientEntry from "./PatientEntry";
import AddPatientEntryForm from "./AddPatientEntryForm";


interface PatientModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string | null;
}

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return MaleIcon;
    case Gender.Female:
      return FemaleIcon;
    case Gender.Other:
      return TransgenderIcon;
    default:
      return "";
  }
};

const PatientModal: React.FC<PatientModalProps> = ({ open, onClose, patientId }) => {

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);

  const onCreatedPatientEntry = (updatedPatient: Patient) => {
    console.log("New entry:", updatedPatient);
    setPatient(updatedPatient);
    setShowEntryForm(false);
  };

  useEffect(() => {
    if (open && patientId) {
      setLoading(true);
      setError(null);
      axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`)
        .then(res => {
          setPatient(res.data);
          setLoading(false);
        })
        .catch(err => {
          setError("Patient information could not be loaded.");
          console.error('Error loading patient information ', err);
          setLoading(false);
        });
    } else {
      setPatient(null);
    }
  }, [open, patientId]);


  return (
    <Dialog 
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      disableEscapeKeyDown
      maxWidth="lg"
      PaperProps={{
        style: { minWidth: '80vw', minHeight: 80 }
      }}
    >
      <DialogTitle>
        <b>Patient data</b>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ overflowY: 'auto', maxHeight: '60vh' }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : patient ? (
          <>
            <Typography variant="h5" gutterBottom>
              {patient.name} {React.createElement(genderIcon(patient.gender))}
            </Typography>
                {patient.ssn && <Typography><b>SSN:</b> {patient.ssn}</Typography>}
            <Typography><b>Occupation:</b> {patient.occupation}</Typography>
                {patient.dateOfBirth && <Typography><b>Date of Birth:</b> {patient.dateOfBirth}</Typography>}
            <Typography><b>Medical Entries:</b> {patient.entries.length}</Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: '16px 0' }}
              onClick={() => setShowEntryForm((prev) => !prev)}
            >
              {showEntryForm ? "Close entry form" : "Add entry"}
            </Button>
            {showEntryForm && (
              <div style={{ margin: '16px 0' }}>
                <AddPatientEntryForm patientId={patient.id} onCreatePatientEntry={onCreatedPatientEntry}/>
              </div>
            )}
            {patient.entries.length === 0 ? (
              <Typography>No medical entries available.</Typography>
            ) : (
              <div style={{ marginTop: 8 }}>
                {patient.entries.map(entry => <PatientEntry key={entry.id} entry={entry} />)}
              </div>
            )}
          </>
        ) : (
          <Typography>Select a patient to view information.</Typography>
        )}
      </DialogContent>
      <Divider />
      <DialogActions style={{padding: '20px'}}>
        <Button onClick={onClose} color="primary" variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientModal;
