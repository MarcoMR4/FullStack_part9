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

// Example in comand: npm run calculateExercises -- 2 3 0 2 4.5 0 3 1
// First 3 arguments are ommitted (node, script path, ...), so first is target, rest are daily hours
const hoursPerDayArgs = process.argv.slice(2);

if (hoursPerDayArgs.length < 2) {
  console.warn("Usage: npm run calculateExercises -- <target> <day1> <day2> ... <dayN>; at least two arguments required.");
  process.exit(1);
}

const [hoursTargetArg, ...hoursPerDayWithoutTarget] = hoursPerDayArgs;
const target = Number(hoursTargetArg);
const dailyHours = hoursPerDayWithoutTarget.map(Number);

if (isNaN(target) || dailyHours.some(h => isNaN(h))) {
  console.error("All arguments must be numbers.");
  process.exit(1);
}

console.log(calculateExercises(dailyHours, target));
