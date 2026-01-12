import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { UserResponseSchema } from '../users/user.schema';

export const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(72),
})

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  user: UserResponseSchema,
})

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
})

export class LoginRequest extends createZodDto(LoginRequestSchema) {}
export class AuthResponse extends createZodDto(AuthResponseSchema) {}
export class RefreshTokenRequest extends createZodDto(RefreshTokenRequestSchema) {}