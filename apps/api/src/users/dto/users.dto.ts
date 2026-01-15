import { createZodDto } from 'nestjs-zod';
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
  UserResponseSchema,
} from '@repo/contracts';

export class UserResponse extends createZodDto(UserResponseSchema) {}
export class CreateUserRequest extends createZodDto(CreateUserRequestSchema) {}
export class UpdateUserRequest extends createZodDto(UpdateUserRequestSchema) {}
