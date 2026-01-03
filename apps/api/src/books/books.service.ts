import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Book[]> {
    // Fetch all books using the types from @prisma/client
    return this.prisma.book.findMany();
  }
}
