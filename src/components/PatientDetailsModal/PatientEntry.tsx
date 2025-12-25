import React from "react";
import { Typography } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from "../../types/patients";
import { healthCheckColor } from "../../helpers/patients";

const renderDiagnosisCodes = (codes?: string[]) => {
  if (!codes || codes.length === 0) 
    return null;
  return (
    <ul style={{ margin: '4px 0 4px 16px', padding: 0 }}>
      {codes.map(code => (
        <li key={code}>{code}</li>
      ))}
    </ul>
  );
};

interface PatientEntryProps {
  entry: Entry;
}

const PatientEntry: React.FC<PatientEntryProps> = ({ entry }) => {
  let icon = null;
  let details = null;
  switch (entry.type) {
    case 'Hospital': {
      icon = <LocalHospitalIcon style={{ color: '#1976d2', marginRight: 8 }} />;
      const e = entry as HospitalEntry;
      details = (
        <>
          <Typography><b>Discharge:</b> {e.discharge.date} ({e.discharge.criteria})</Typography>
        </>
      );
      break;
    }
    case 'HealthCheck': {
      const e = entry as HealthCheckEntry;
      icon = <FavoriteIcon style={{ color: healthCheckColor(e.healthCheckRating), marginRight: 8 }} />;
      details = (
        <>
          <Typography><b>Health Check Rating:</b> {e.healthCheckRating}</Typography>
        </>
      );
      break;
    }
    case 'OccupationalHealthcare': {
      icon = <WorkIcon style={{ color: '#43a047', marginRight: 8 }} />;
      const e = entry as OccupationalHealthcareEntry;
      details = (
        <>
          <Typography><b>Employer:</b> {e.employerName}</Typography>
          {e.sickLeave && (
            <Typography><b>Sick Leave:</b> {e.sickLeave.startDate} - {e.sickLeave.endDate}</Typography>
          )}
        </>
      );
      break;
    }
    default:
      icon = <MedicalServicesIcon style={{ color: '#888', marginRight: 8 }} />;
      details = null;
  }
  return (
    <div
      key={entry.id}
      style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'column',
        background: '#fafbfc',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        {icon}
        <Typography variant="subtitle1" style={{ fontWeight: 600, flex: 1 }}>
          {entry.date} - {entry.type}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {entry.specialist}
        </Typography>
      </div>
      <Typography style={{ marginBottom: 4 }}>{entry.description}</Typography>
      {renderDiagnosisCodes(entry.diagnosisCodes)}
      {details}
    </div>
  );
};

export default PatientEntry;
