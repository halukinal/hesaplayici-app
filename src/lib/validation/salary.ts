import {z} from 'zod';

export const salarySchema = z.object({
  amount: z
    .number()
    .positive({message: 'amountPositive'})
    .max(10_000_000, {message: 'amountTooLarge'}),
  mode: z.enum(['gross-to-net', 'net-to-gross']),
});

export type SalaryFormData = z.infer<typeof salarySchema>;
