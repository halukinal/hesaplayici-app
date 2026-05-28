import {z} from 'zod';

export const vatSchema = z.object({
  amount: z
    .number()
    .positive({message: 'amountPositive'})
    .max(999_999_999, {message: 'amountTooLarge'}),
  vatRate: z
    .number()
    .min(0.01, {message: 'invalidRate'})
    .max(100, {message: 'invalidRate'}),
  mode: z.enum(['add', 'remove']),
});

export type VatFormData = z.infer<typeof vatSchema>;
