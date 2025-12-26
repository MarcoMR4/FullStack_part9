import React, { useState } from "react";
import { 
  Box, 
  Table, 
  Button, 
  TableHead, 
  Typography, 
  TableCell, 
  TableRow, 
  TableBody
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

import { apiBaseUrl} from "../../constants";

import { 
  PatientFormValues, 
  Patient 
} from "../../types/patients";
import AddPatientModal from "../AddPatientModal";
import PatientDetailsModal from "../PatientDetailsModal";

import HealthRatingBar from "./HealthRatingBar";
import { getAverageHealthCheckRating } from "../../helpers/patients";

interface Props {
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patients, setPatients } : Props ) => {

  const [addPatientModalOpen, setAddPatientModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patientDetailsModalOpen, setPatientDetailsModalOpen] = useState<boolean>(false);

  const openPatientDetailsModal  = (id: string) => {
    setSelectedPatientId(id);
    setPatientDetailsModalOpen(true);
  };
  
  const closePatientDetailsModal = () => {
    setPatientDetailsModalOpen(false);
    setSelectedPatientId(null);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await axios.post<Patient>(apiBaseUrl + "/patients", values);
      setPatients(patients.concat(patient.data));
      setAddPatientModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  // Update patient entries in the list when a new entry is added
  const handlePatientEntriesUpdate = (updatedPatient: Patient) => {
    setPatients((prevPatients) =>
      prevPatients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
  };

  return (
    <div className="App">
      <Button 
        style={{ marginTop: "1em" }}
        variant="contained" onClick={() => setAddPatientModalOpen(true)}
      >
        Add New Patient
      </Button>
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                {(() => {
                  const avgRating = getAverageHealthCheckRating(patient);
                  if (avgRating === null) {
                    return <Typography variant="body2" color="textSecondary">No HealthCheck entries registered</Typography>;
                  }
                  return <HealthRatingBar showText={true} rating={avgRating - 1} />;
                })()}
              </TableCell>
              <TableCell>
                <Button variant="text" onClick={() => openPatientDetailsModal(patient.id)}>
                  {React.createElement(VisibilityIcon)}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={addPatientModalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={() => setAddPatientModalOpen(false)}
      />
      <PatientDetailsModal
        open={patientDetailsModalOpen}
        onClose={closePatientDetailsModal}
        patientId={selectedPatientId}
        onPatientEntriesUpdate={handlePatientEntriesUpdate}
      />
    </div>
  );
};

export default PatientListPage;
