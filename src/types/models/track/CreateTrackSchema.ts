import {
  object,
  string,
  array,
  instanceof as zInstanceof,
  ZodIssueCode,
} from 'zod';


const trackSchema = object({
  artist: string().min(1, { message: 'Artist is required' }).max(25),
  title: string().min(1, { message: 'Title is required' }).max(25),
  album: string().max(25).optional(),
  coverImage: string(),
  file: zInstanceof(File).optional(),
  genres: array(object({ label: string(), value: string() })).min(1, {
    message: 'At least one genre must be selected',
  }),
}).superRefine(async (val, ctx) => {
  const url = val.coverImage.trim();

  if (!url) return;

  const isValidImage = await isImageUrl(url);

  if (!isValidImage) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'URL does not point to a valid image',
      path: ['coverImage'],
    });
  }
});


async function isImageUrl(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // на всяк випадок

    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const contentType = response.headers.get('Content-Type');

    return response.ok && !!contentType && contentType.startsWith('image/');
  } catch (e) {
    return false;
  }
}

export default trackSchema;
