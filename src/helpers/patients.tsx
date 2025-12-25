import { HealthCheckRating } from "../types/patients";
import { HealthCheckEntry } from "../types/patients";
import { Patient } from "../types/patients";

export function healthCheckColor(rating: number) {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return 'green';
    case HealthCheckRating.LowRisk:
      return 'yellow';
    case HealthCheckRating.HighRisk:
      return 'orange';
    case HealthCheckRating.CriticalRisk:
      return 'red';
    default:
      return 'grey';
  }
}

export const healthCheckRatingOptions = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];

/**
 * Calculates the average healthCheckRating from 'HealthCheck' entries for a patient.
 * Returns a number between 1 and 4 (for HealthRatingBar), rounded to the nearest integer.
 * If there are no HealthCheck entries, returns null.
 */
export function getAverageHealthCheckRating(patient: Patient): number | null {
  if (!patient.entries || patient.entries.length === 0) 
    return null;
  const healthCheckEntries = patient.entries.filter(
    (e): e is HealthCheckEntry => e.type === "HealthCheck"
  );
  if (healthCheckEntries.length === 0) 
    return null;
  const sum = healthCheckEntries.reduce((acc, entry) => acc + entry.healthCheckRating, 0);
  const avg = sum / healthCheckEntries.length;
  // Convert to 1-4 scale for HealthRatingBar (0=Healthy to 3=CriticalRisk)
  let rating = Math.round(avg) + 1;
  if (rating < 1) 
    rating = 1;
  if (rating > 4) 
    rating = 4;
  return rating;
}
