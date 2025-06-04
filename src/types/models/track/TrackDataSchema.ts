import { z } from 'zod';

const audioFileSchema = z
  .string()
  .refine((val) => /\.(mp3|wav|ogg)$/i.test(val), {
    message: 'Audio file must be in .mp3, .wav, or .ogg format',
  });

  
 const TrackDataSchema = z.object({
  artist: z.string().min(1, { message: 'Artist is required' }).max(25),
  title: z.string().min(1, { message: 'Title is required' }).max(25),
  album: z.string().optional(),
  genres: z
    .array(z.string(), {
      invalid_type_error: 'Genres must be an array of strings',
    })
    .min(1, 'At least one genre is required'),
  audioFile: audioFileSchema.optional(),
  coverImage: z.string().url('Cover image must be a valid URL').optional(),
});

export default TrackDataSchema
