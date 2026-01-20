import { z } from 'zod';
import { UserResponseSchema } from '../users/user.schema';

export const RegisterRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(72),
});

export const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(72),
})

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  user: UserResponseSchema,
})

export const RefreshResponseSchema = z.object({
  accessToken: z.string(),
})

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;