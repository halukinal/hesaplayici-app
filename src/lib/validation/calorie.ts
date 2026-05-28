import {z} from 'zod';

export const calorieSchema = z.object({
  age: z
    .number()
    .int()
    .min(1, {message: 'invalidAmount'})
    .max(120, {message: 'amountTooLarge'}),
  weightKg: z
    .number()
    .min(2, {message: 'amountPositive'})
    .max(400, {message: 'amountTooLarge'}),
  heightCm: z
    .number()
    .min(30, {message: 'amountPositive'})
    .max(260, {message: 'amountTooLarge'}),
  sex: z.enum(['male', 'female']),
  activityLevel: z.enum([
    'sedentary',
    'light',
    'moderate',
    'active',
    'veryActive',
  ]),
});

export type CalorieFormData = z.infer<typeof calorieSchema>;
