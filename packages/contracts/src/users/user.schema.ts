import {z} from 'zod';
import {BaseEntityResponseSchema} from '../common/base.schema';

export const UserResponseSchema = BaseEntityResponseSchema.extend({
  email: z.email(),
  password: z.string().min(8).max(72),
  name: z.string().min(3).optional(),
})

export type UserResponse = z.output<typeof UserResponseSchema>;