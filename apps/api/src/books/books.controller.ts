import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UsePipes,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';

import {
  ApiOkResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import {
  BookResponse,
  CreateBookRequest,
  UpdateBookRequest,
  CreateBookRequestSchema,
  UpdateBookRequestSchema,
  ApiError,
} from '@repo/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateBookRequestSchema))
  @ApiCreatedResponse({ type: BookResponse })
  @ApiOkResponse({ type: BookResponse })
  async addBook(@Body() bookRequest: CreateBookRequest): Promise<BookResponse> {
    return this.booksService.create(bookRequest);
  }

  @Get()
  @ApiOkResponse({ type: [BookResponse] })
  async getAll(): Promise<BookResponse[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: BookResponse })
  @ApiNotFoundResponse({ type: ApiError, description: 'Book not found' })
  async getBookById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BookResponse> {
    return this.booksService.findById(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateBookRequest })
  @ApiOkResponse({ type: BookResponse })
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(UpdateBookRequestSchema))
    body: UpdateBookRequest,
  ): Promise<BookResponse> {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiNotFoundResponse({ type: ApiError, description: 'Book not found' })
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Book deleted' })
  async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.booksService.delete(id);
  }
}
