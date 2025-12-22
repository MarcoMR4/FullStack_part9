import { HealthCheckRating } from "../types/patients";

export const healthCheckColor = (rating: number) => {
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
};
