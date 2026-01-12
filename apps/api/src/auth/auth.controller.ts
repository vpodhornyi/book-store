import { ZodValidationPipe } from 'nestjs-zod';
import { Controller, Get, Post, Req, UseGuards, Body } from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';
import {
  AuthResponse,
  LoginRequest,
  LoginRequestSchema,
} from '@repo/contracts';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('login')
  async login(
    @Body(new ZodValidationPipe(LoginRequestSchema)) body: LoginRequest,
  ): Promise<AuthResponse> {
    return this.authService.login(body);
  }
}
