import express from 'express'
import { calculateBmi }  from './src/bmiCalculator'
import { calculateExercises } from './src/exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/', (_req, res) => {
  res.send('Welcome to the BMI and Exercise Calculator mini API with TypeScript and Express!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  const parsedHeight = Number(height)
  const parsedWeight = Number(weight)

  if (!height || !weight || isNaN(parsedHeight) || isNaN(parsedWeight)) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  const bmi = calculateBmi(parsedHeight, parsedWeight)
  return res.json({
    weight: parsedWeight,
    height: parsedHeight,
    bmi
  })
})

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!Array.isArray(daily_exercises) || !daily_exercises.every(h => typeof h === 'number') || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, Number(target));
  return res.json(result);
});

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
