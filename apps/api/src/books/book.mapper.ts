import { Prisma, type Book } from '@prisma/client';
import { BookResponseSchema } from '@repo/contracts';
import { BookResponse, CreateBookRequest } from './dto/books.dto';
import { type UpdateBookRequest } from '@repo/contracts';

type BookUpdateData = {
  data: {
    title?: string;
    author?: string;
    description?: string | null;
    price?: number;
    stock?: number;
  };
};

export function toBookResponse(book: Book): BookResponse {
  const dto: BookResponse = {
    id: book.id,
    title: book.title,
    author: book.author,
    description: book.description ?? '',
    price: book.price,
    stock: book.stock,
    createdAt: book.createdAt.toISOString(),
    updatedAt: book.updatedAt.toISOString(),
  } satisfies BookResponse;
  return BookResponseSchema.parse(dto);
}

export function toBookCreateData(
  dto: CreateBookRequest,
): Prisma.BookCreateInput {
  return {
    ...dto,
    description: dto.description ?? null,
  };
}

export function toBookUpdateData(dto: UpdateBookRequest): BookUpdateData {
  const data: BookUpdateData['data'] = {};

  if (dto.title !== undefined) data.title = dto.title;
  if (dto.author !== undefined) data.author = dto.author;
  if (dto.price !== undefined) data.price = dto.price;
  if (dto.stock !== undefined) data.stock = dto.stock;
  if ('description' in dto) data.description = dto.description ?? null;

  return { data };
}
