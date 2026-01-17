import { createZodDto } from 'nestjs-zod';
import { ApiErrorSchema } from '@repo/contracts';

export class ApiError extends createZodDto(ApiErrorSchema) {}