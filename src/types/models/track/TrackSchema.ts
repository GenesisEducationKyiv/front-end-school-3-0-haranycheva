import { z } from 'zod';
import TrackDataSchema from './TrackDataSchema';

  
 const TrackSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
    invalid_type_error: 'ID must be a string',
  }),
  slug: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ...TrackDataSchema.shape
});

export default TrackSchema
