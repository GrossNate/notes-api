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