import { z } from 'zod';

export const ApiErrorSchema = z.object({
  requestId: z.string(),
  statusCode: z.number().int(),
  error: z.string(),
  message: z.string(),
  path: z.string(),
  timestamp: z.string(),
});

export type ApiError = z.output<typeof ApiErrorSchema>;