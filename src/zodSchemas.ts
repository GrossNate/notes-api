import z from 'zod';

export const userZodSchema = z.object({
  username: z.string(),
  clearPassword: z.string()
});

export const getNotesZodSchema = z.object({
  username: z.string(),
  token: z.string()
});

export const containsTokenStringZodSchema = z.object({
  token: z.string(),
  username: z.string()
});

export const noteRowZodSchema = z.object({
  id: z.string(),
  username: z.string(),
  content: z.string(),
  created_timestamp: z.date()
});

export const noteRowArrayZodSchema = z.array(noteRowZodSchema);

export const postNoteZodSchema = z.object({
  username: z.string(),
  content: z.string()
});