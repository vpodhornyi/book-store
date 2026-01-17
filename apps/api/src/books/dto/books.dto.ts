import { createZodDto } from 'nestjs-zod';
import {
  BookResponseSchema,
  CreateBookRequestSchema,
  UpdateBookRequestSchema,
} from '@repo/contracts';

export class BookResponse extends createZodDto(BookResponseSchema) {}
export class CreateBookRequest extends createZodDto(CreateBookRequestSchema) {}
export class UpdateBookRequest extends createZodDto(UpdateBookRequestSchema) {}
