import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, type Book } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  type BookResponse,
  type CreateBookRequest,
  type UpdateBookRequest,
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

  async findById(id: number): Promise<BookResponse> {
    const book: Book | null = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) throw new NotFoundException();

    return toBookResponse(book);
  }

  async create(dto: CreateBookRequest): Promise<BookResponse> {
    const data: Prisma.BookCreateInput = toBookCreateData(dto);
    const book: Book = await this.prisma.book.create({ data });
    return toBookResponse(book);
  }

  async update(id: number, dto: UpdateBookRequest): Promise<BookResponse> {
    const book: Book = await this.prisma.book.update({
      where: { id },
      ...toBookUpdateData(dto),
    });

    return toBookResponse(book);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.book.delete({ where: { id } });
  }
}
