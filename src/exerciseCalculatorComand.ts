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
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
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

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log("Usage: npm run calculateExercises -- <target> <day1> <day2> ...");
  process.exit(1);
}

const [targetArg, ...hourArgs] = args;

const target = Number(targetArg);
const dailyHours = hourArgs.map(Number);

if (isNaN(target) || dailyHours.some(h => isNaN(h))) {
  console.log("All arguments must be numbers.");
  process.exit(1);
}

console.log(calculateExercises(dailyHours, target));
