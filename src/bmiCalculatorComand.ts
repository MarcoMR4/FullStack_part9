export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let bmiresult:string = "BMI result: ";
  if (bmi < 18.5) 
    bmiresult += "Underweight";
  else if (bmi < 25) 
    bmiresult += "Normal (healthy weight)";
  else if (bmi < 30) 
    bmiresult += "Overweight";
  else 
    bmiresult += "Obese";
  return bmiresult;
};

// Example in comand: npm run calculateBmi -- 180 91

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.warn("Usage: npm run calculateBmi -- <height(cm)> <weight(kg)>; exactly two arguments required.");
  process.exit(1);
}

const [heightArg, weightArg] = args;
const height = Number(heightArg);
const weight = Number(weightArg);

if (isNaN(height) || isNaN(weight)) {
  console.error("Both height and weight must be numbers.");
  process.exit(1);
}

console.log(calculateBmi(height, weight));
