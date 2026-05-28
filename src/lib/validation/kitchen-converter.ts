import {z} from 'zod';

export const kitchenConverterSchema = z.object({
  amount: z.number({message: 'invalidAmount'}).positive({message: 'amountPositive'}).max(10000, {message: 'amountTooLarge'}),
  fromUnit: z.enum(['su-bardagi', 'cay-bardagi', 'yemek-kasigi', 'tatli-kasigi', 'cay-kasigi', 'litre', 'ml', 'gram']),
});
