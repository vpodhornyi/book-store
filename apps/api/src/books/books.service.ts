import { Prisma } from '@prisma/client';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

const BOOK_NOT_FOUND_ERROR = 'Book not found';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BookResponse[]> {
    const books: Book[] = await this.prisma.book.findMany();
    return books.map(toBookResponse);
  }

  async findById(id: number): Promise<BookResponse> {
    const book: Book | null = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(BOOK_NOT_FOUND_ERROR);
    }

    return toBookResponse(book);
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
    try {
      await this.prisma.book.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            throw new NotFoundException(BOOK_NOT_FOUND_ERROR);
          case 'P2003':
            throw new ConflictException(
              'Book is referenced by other entities and cannot be deleted',
            );
        }
      }
      throw e;
    }
  }
}
