import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UsePipes,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiOkResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { BooksService } from './books.service';
import {
  type BookResponse,
  type CreateBookRequest,
  type UpdateBookRequest,
  CreateBookRequestSchema,
  UpdateBookRequestSchema,
} from '@repo/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

const API_TAG = 'books';

@ApiTags(API_TAG)
@Controller(API_TAG)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of Books',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/BookResponse',
      },
    },
  })
  async getAll(): Promise<BookResponse[]> {
    return this.booksService.findAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateBookRequestSchema))
  @ApiBody({
    schema: { $ref: '#/components/schemas/CreateBookRequest' },
  })
  @ApiOkResponse({
    description: 'Book',
    schema: { $ref: '#/components/schemas/BookResponse' },
  })
  async addBook(@Body() bookRequest: CreateBookRequest): Promise<BookResponse> {
    return this.booksService.create(bookRequest);
  }

  @Patch(':id')
  @ApiBody({
    schema: { $ref: '#/components/schemas/UpdateBookRequest' },
  })
  @ApiOkResponse({
    description: 'Book',
    schema: { $ref: '#/components/schemas/BookResponse' },
  })
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(UpdateBookRequestSchema))
    body: UpdateBookRequest,
  ): Promise<BookResponse> {
    return this.booksService.update(id, body);
  }
}
