export type Sex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

export interface CalorieInput {
  age: number;
  weightKg: number;
  heightCm: number;
  sex: Sex;
  activityLevel: ActivityLevel;
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

/**
 * Kalori ve BMI hesaplama.
 * Formül: Mifflin-St Jeor
 * Kaynak: Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO (1990)
 */
export function calculateCalories(input: CalorieInput): CalorieResult {
  const {age, weightKg, heightCm, sex, activityLevel} = input;

  // BMR Calculation
  let bmr: number;
  if (sex === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // TDEE Calculation
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];

  // BMI Calculation
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  // BMI Category
  let bmiCategory: CalorieResult['bmiCategory'];
  if (bmi < 18.5) bmiCategory = 'underweight';
  else if (bmi < 25) bmiCategory = 'normal';
  else if (bmi < 30) bmiCategory = 'overweight';
  else bmiCategory = 'obese';

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
  };
}
