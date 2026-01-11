import { z } from 'zod';
import { BaseIdSchema } from '../common/base.schema';

export const UserResponseSchema = BaseIdSchema.extend({
  email: z.email(),
  name: z.string().min(3).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateUserRequestSchema = z.object({
  email: z.email(),
  name: z.string().min(3).optional(),
  password: z.string().min(8).max(72),
}).openapi({
  example: {
    email: 'test@mail.com',
    password: '$2a$12$Y3kg/9AIHoB0NuiHFjpczelDcM7tU/X64uOaCTjW//F2rlnbwfSji',
    name: 'Alex',
  },
})

export const UpdateUserRequestSchema = z.object({
  email: z.email().optional(),
  name: z.string().min(3).optional(),
  password: z.string().min(8).max(72).optional(),
});

export type UserResponse = z.output<typeof UserResponseSchema>;
export type CreateUserRequest = z.input<typeof CreateUserRequestSchema>;
export type UpdateUserRequest = z.input<typeof UpdateUserRequestSchema>;