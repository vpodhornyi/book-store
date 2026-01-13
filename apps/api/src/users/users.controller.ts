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
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  CreateUserRequest,
  CreateUserRequestSchema,
  UpdateUserRequest,
  UserResponse,
  ApiError,
  UpdateUserRequestSchema,
} from '@repo/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

const API_TAG = 'users';

@ApiTags(API_TAG)
@Controller(API_TAG)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserRequestSchema))
  @ApiOkResponse({ type: UserResponse })
  async create(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<UserResponse> {
    return this.usersService.create(createUserRequest);
  }

  @Get()
  @ApiOkResponse({ type: [UserResponse] })
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse({ type: ApiError, description: 'User not found' })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    return this.usersService.findByIdOrThrow(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserRequest })
  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse({ type: ApiError, description: 'User not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(UpdateUserRequestSchema))
    body: UpdateUserRequest,
  ): Promise<UserResponse> {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ type: ApiError, description: 'User not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
