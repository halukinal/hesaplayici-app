import {z} from 'zod';

export const fabricSchema = z.object({
  project: z.enum(['perde', 'etek', 'elbise', 'pantolon', 'koltuk-kilifi']),
  curtainWidth: z.number().min(10).max(2000).optional(),
  curtainHeight: z.number().min(10).max(500).optional(),
  panels: z.number().int().min(1).max(20).optional(),
  hip: z.number().min(40).max(300).optional(),
  waist: z.number().min(40).max(300).optional(),
  skirtLength: z.number().min(10).max(200).optional(),
  dressHeight: z.number().min(30).max(300).optional(),
  inseam: z.number().min(30).max(150).optional(),
  seatWidth: z.number().min(30).max(300).optional(),
  seatDepth: z.number().min(30).max(200).optional(),
  seatHeight: z.number().min(20).max(200).optional(),
});
