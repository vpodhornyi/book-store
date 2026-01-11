import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { BaseEntityResponseSchema } from '../common/base.schema';

export const UserResponseSchema = BaseEntityResponseSchema.extend({
  email: z.email(),
  name: z.string().min(3).optional(),
})

export const CreateUserRequestSchema = z.object({
  email: z.email(),
  name: z.string().min(3).optional(),
  password: z.string().min(8).max(72),
}).openapi({
  example: {
    email: 'test@mail.com',
    password: '11112222',
    name: 'Alex',
  },
})

export const UpdateUserRequestSchema = z.object({
  email: z.email().optional(),
  name: z.string().min(3).optional(),
  password: z.string().min(8).max(72).optional(),
});

export class UserResponse extends createZodDto(UserResponseSchema) {}
export class CreateUserRequest extends createZodDto(CreateUserRequestSchema) {}
export class UpdateUserRequest extends createZodDto(UpdateUserRequestSchema) {}