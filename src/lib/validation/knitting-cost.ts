import {z} from 'zod';

export const knittingSchema = z.object({
  yarnCost: z.number().min(0, {message: 'amountPositive'}),
  accessoryCost: z.number().min(0, {message: 'amountPositive'}),
  shippingCost: z.number().min(0, {message: 'amountPositive'}),
  laborHours: z.number().min(0, {message: 'amountPositive'}),
  laborRate: z.number().min(0, {message: 'amountPositive'}),
  profitRate: z.number().min(0).max(1000).optional(),
  salesPrice: z.number().min(0).optional(),
  mode: z.enum(['suggest', 'profit']),
});

export type KnittingFormData = z.infer<typeof knittingSchema>;
