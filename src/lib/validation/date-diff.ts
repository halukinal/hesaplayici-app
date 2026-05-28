import {z} from 'zod';

export const dateDiffSchema = z.object({
  startDate: z.string().min(1, {message: 'invalidDate'}),
  endDate: z.string().min(1, {message: 'invalidDate'}),
});
