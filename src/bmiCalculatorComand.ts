export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal (healthy weight)";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

// Example in comand: npm run calculateBmi -- 180 91

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log("Usage: npm run calculateBmi -- <height(cm)> <weight(kg)>");
  process.exit(1);
}

const [heightArg, weightArg] = args;
const height = Number(heightArg);
const weight = Number(weightArg);

if (isNaN(height) || isNaN(weight)) {
  console.log("Both height and weight must be numbers.");
  process.exit(1);
}

console.log(calculateBmi(height, weight));
