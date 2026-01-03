import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '@prisma/client';

@Controller('books') // Defines /books route
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAll(): Promise<Book[]> {
    // Return the list of books found in the database
    return this.booksService.findAll();
  }
}
