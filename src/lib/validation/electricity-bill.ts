import {z} from 'zod';

export const electricitySchema = z.object({
  watts: z.number().min(1).max(100000, {message: 'invalidAmount'}),
  hoursPerDay: z.number().min(0.1).max(24, {message: 'invalidAmount'}),
  tariff: z.number().min(0.01).max(1000, {message: 'invalidAmount'}),
});
