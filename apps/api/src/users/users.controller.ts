import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  HttpCode,
} from '@nestjs/common';

import {
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  type CreateUserRequest,
  CreateUserRequestSchema,
  UpdateBookRequestSchema,
  type UpdateUserRequest,
  type UserResponse,
} from '@repo/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserRequestSchema))
  @ApiBody({
    schema: { $ref: '#/components/schemas/CreateUserRequest' },
  })
  @ApiOkResponse({
    description: 'User',
    schema: { $ref: '#/components/schemas/UserResponse' },
  })
  async create(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<UserResponse> {
    return this.usersService.create(createUserRequest);
  }

  @Get()
  @ApiOkResponse({
    description: 'List of Users',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/UserResponse',
      },
    },
  })
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: { $ref: '#/components/schemas/ApiError' },
  })
  @ApiOkResponse({
    description: 'User',
    schema: { $ref: '#/components/schemas/UserResponse' },
  })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: { $ref: '#/components/schemas/UpdateUserRequest' },
  })
  @ApiOkResponse({
    description: 'User',
    schema: { $ref: '#/components/schemas/UserResponse' },
  })
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateBookRequestSchema))
    body: UpdateUserRequest,
  ): Promise<UserResponse> {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: { $ref: '#/components/schemas/ApiError' },
  })
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'User deleted',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
