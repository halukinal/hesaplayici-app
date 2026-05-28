import {z} from 'zod';

export const workDaysSchema = z.object({
  startDate: z.string().min(1, {message: 'invalidDate'}),
  workDays: z.number().int().min(1).max(1000, {message: 'invalidAmount'}),
  mode: z.enum(['add', 'subtract']),
});
