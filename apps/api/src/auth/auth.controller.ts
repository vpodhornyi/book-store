import { ZodValidationPipe } from 'nestjs-zod';
import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Body,
  Res,
  UsePipes,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RefreshResponse,
} from './dto/auth.dto';
import { UserResponse } from '../users/dto/users.dto';
import { LoginRequestSchema, RegisterRequestSchema } from '@repo/contracts';
import { AuthService } from './auth.service';
import { SessionMeta } from '../types/session-meta.type';
import { ApiOkResponse, ApiCookieAuth } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import type { AuthRequest } from '../types/auth-request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: AuthRequest): Promise<UserResponse> {
    const id: number = req.user.userId;
    if (!id) throw new UnauthorizedException('Invalid token');

    return await this.userService.findByIdOrThrow(id);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterRequestSchema))
  @ApiOkResponse({ type: AuthResponse })
  async register(
    @Body() body: RegisterRequest,
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
  @UsePipes(new ZodValidationPipe(LoginRequestSchema))
  @ApiOkResponse({ type: AuthResponse })
  async login(
    @Body() body: LoginRequest,
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
  @ApiOkResponse({ type: AuthResponse })
  @ApiCookieAuth('refreshToken')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RefreshResponse> {
    const refreshToken = req.cookies?.refreshToken as string | undefined;
    const metaData: SessionMeta = this.getMeta(req);
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(refreshToken, metaData);
    this.setCookie(res, newRefreshToken);

    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiCookieAuth('refreshToken')
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
