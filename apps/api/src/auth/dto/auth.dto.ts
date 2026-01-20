import { createZodDto } from 'nestjs-zod';
import {
  RegisterRequestSchema,
  LoginRequestSchema,
  AuthResponseSchema,
  RefreshResponseSchema,
} from '@repo/contracts';

export class RegisterRequest extends createZodDto(RegisterRequestSchema) {}
export class LoginRequest extends createZodDto(LoginRequestSchema) {}
export class AuthResponse extends createZodDto(AuthResponseSchema) {}
export class RefreshResponse extends createZodDto(RefreshResponseSchema) {}
