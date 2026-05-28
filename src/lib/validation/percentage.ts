import {z} from 'zod';

export const percentageSchema = z.object({
  mode: z.enum(['findValue', 'findPercentage', 'findChange']),
  value1: z.number({message: 'invalidAmount'}),
  value2: z.number({message: 'invalidAmount'}),
}).refine(data => !(data.mode === 'findPercentage' && data.value2 === 0), {
  message: 'cannotDivideByZero',
  path: ['value2'],
});

export type PercentageFormData = z.infer<typeof percentageSchema>;
