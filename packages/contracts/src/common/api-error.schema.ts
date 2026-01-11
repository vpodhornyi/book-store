import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const ApiErrorSchema = z.object({
  requestId: z.string(),
  statusCode: z.number().int(),
  error: z.string(),
  message: z.string(),
  path: z.string(),
  timestamp: z.string(),
});

export class ApiError extends createZodDto(ApiErrorSchema) {}