import {z} from 'zod';

export const wallpaintSchema = z.object({
  mode: z.enum(['boya', 'duvar-kagidi']),
  roomWidth: z.number().min(0.5).max(100, {message: 'invalidAmount'}),
  roomLength: z.number().min(0.5).max(100, {message: 'invalidAmount'}),
  roomHeight: z.number().min(1).max(20, {message: 'invalidAmount'}),
  doors: z.number().int().min(0).max(20),
  windows: z.number().int().min(0).max(30),
  coats: z.number().int().min(1).max(5).optional(),
});
