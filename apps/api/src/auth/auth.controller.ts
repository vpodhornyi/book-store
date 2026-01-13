import { ZodValidationPipe } from 'nestjs-zod';
import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import type { Response, Request } from 'express';

import { JwtAuthGuard } from './jwt-auth.guard';
import {
  AuthResponse,
  LoginRequest,
  LoginRequestSchema,
  RegisterRequest,
  RegisterRequestSchema,
} from '@repo/contracts';
import { AuthService } from './auth.service';
import { SessionMeta } from '../types/session-meta.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(RegisterRequestSchema)) body: RegisterRequest,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const metaData: SessionMeta = this.getMeta(req);
    const { accessToken, refreshToken, user } = await this.authService.register(
      body,
      metaData,
    );
    this.setCookie(res, refreshToken);

    return { accessToken, user };
  }

  @Post('login')
  async login(
    @Body(new ZodValidationPipe(LoginRequestSchema)) body: LoginRequest,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const metaData: SessionMeta = this.getMeta(req);
    const { accessToken, refreshToken, user } = await this.authService.login(
      body,
      metaData,
    );
    this.setCookie(res, refreshToken);

    return { accessToken, user };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const refreshToken = req.cookies?.refreshToken as string | undefined;
    const metaData: SessionMeta = this.getMeta(req);
    const {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    } = await this.authService.refresh(refreshToken, metaData);
    this.setCookie(res, newRefreshToken);

    return { accessToken, user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ ok: true }> {
    const refreshToken = req.cookies?.refreshToken as string | undefined;
    await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken', {
      path: '/api/auth/refresh',
    });

    return { ok: true };
  }

  private getMeta(req: Request): SessionMeta {
    return {
      userAgent: req.headers['user-agent'],
      ip:
        (req.headers['x-forwarded-for'] as string | undefined)
          ?.split(',')[0]
          ?.trim() ?? req.ip,
    };
  }

  private setCookie(res: Response, token: string): void {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth/refresh',
    });
  }
}
