import {z} from 'zod';

export const rentIncreaseSchema = z.object({
  currentRent: z.number().positive({message: 'amountPositive'}).max(1_000_000, {message: 'amountTooLarge'}),
  increaseRate: z.number().min(0.01).max(500, {message: 'invalidRate'}),
});
