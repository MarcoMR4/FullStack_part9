interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const average = dailyHours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Excellent, target achieved!';
  } 
  else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } 
  else {
    rating = 1;
    ratingDescription = 'You need to put in more effort';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const fixedDailyHours = [3, 0, 2, 4.5, 0, 3, 1];
const fixedTarget = 2;

console.log(calculateExercises(fixedDailyHours, fixedTarget));
