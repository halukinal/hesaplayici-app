import {z} from 'zod';

export const yarnSchema = z.object({
  project: z.enum(['kazak', 'hirka', 'atki', 'bere', 'eldiven']),
  size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
  yarnWeight: z.enum(['ince', 'orta', 'kalin']),
  skeinGrams: z.number().min(10).max(500, {message: 'invalidAmount'}),
});
