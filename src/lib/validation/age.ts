import {z} from 'zod';

export const ageSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {message: 'invalidDate'}),
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {message: 'invalidDate'}).optional(),
}).refine((data) => {
  const birth = new Date(data.birthDate);
  const target = data.targetDate ? new Date(data.targetDate) : new Date();
  return target >= birth;
}, {
  message: 'dateBeforeBirth',
  path: ['targetDate'],
});

export type AgeFormData = z.infer<typeof ageSchema>;
