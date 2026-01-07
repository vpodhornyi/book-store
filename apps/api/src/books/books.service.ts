import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import {
  type BookResponse,
  type CreateBookRequest,
  type UpdateBookRequest,
  CreateBookRequestSchema,
  UpdateBookRequestSchema,
} from '@repo/contracts';
import {
  toBookResponse,
  toBookCreateData,
  toBookUpdateData,
} from './book.mapper';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BookResponse[]> {
    const books: Book[] = await this.prisma.book.findMany();
    return books.map(toBookResponse);
  }

  async create(dto: CreateBookRequest): Promise<BookResponse> {
    const input: CreateBookRequest = CreateBookRequestSchema.parse(dto);
    const book: Book = await this.prisma.book.create(toBookCreateData(input));
    return toBookResponse(book);
  }

  async update(id: number, dto: UpdateBookRequest): Promise<BookResponse> {
    const input = UpdateBookRequestSchema.parse(dto);

    const book = await this.prisma.book.update({
      where: { id },
      ...toBookUpdateData(input),
    });

    return toBookResponse(book);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.book.delete({ where: { id } });
  }
}
