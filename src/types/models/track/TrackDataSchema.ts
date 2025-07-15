import { object, string, array } from 'zod';

const audioFileSchema = 
  string()
  .refine((val) => /\.(mp3|wav|ogg)$/i.test(val), {
    message: 'Audio file must be in .mp3, .wav, or .ogg format',
  });

  
 const TrackDataSchema = object({
  artist: string().min(1, { message: 'Artist is required' }).max(25),
  title: string().min(1, { message: 'Title is required' }).max(25),
  album: string().optional(),
  genres: array(string(), {
      invalid_type_error: 'Genres must be an array of strings',
    })
    .min(1, 'At least one genre is required'),
  audioFile: audioFileSchema  .optional(),
  coverImage: string().url('Cover image must be a valid URL').optional(),
});

export default TrackDataSchema
