import { z } from 'zod';

import { BaseEntityResponseSchema } from '../common/base.schema';

export const UserResponseSchema = BaseEntityResponseSchema.extend({
  email: z.email(),
  name: z.string().min(3).optional(),
})

export const CreateUserRequestSchema = z.object({
  email: z.email(),
  name: z.string().min(3).optional(),
  password: z.string().min(8).max(72),
})

export const UpdateUserRequestSchema = z.object({
  email: z.email().optional(),
  name: z.string().min(3).optional(),
  password: z.string().min(8).max(72).optional(),
})

export type UserResponse = z.infer<typeof UserResponseSchema>
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>
export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>