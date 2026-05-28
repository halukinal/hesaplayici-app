import {z} from 'zod';

export const gradeEntrySchema = z.object({
  name: z.string().min(1),
  grade: z.number().min(0).max(100),
  coefficient: z.number().min(0.5).max(10),
});

export const gradeAverageSchema = z.object({
  grades: z.array(gradeEntrySchema).min(1),
  system: z.enum(['lise', 'universite']),
});
