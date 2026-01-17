import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PasswordUtil } from '../common/util/PasswordUtil';
import { User } from '@prisma/client';
import { LoginRequest, RegisterRequest } from './dto/auth.dto';
import { UserResponse } from '../users/dto/users.dto';
import { UserMapper } from '../users/user.mapper';
import { SessionMeta } from '../types/session-meta.type';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async register(
    dto: RegisterRequest,
    metaData: SessionMeta,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
  }> {
    const existing: User | null = await this.userService.findByEmail(dto.email);

    if (existing) throw new UnauthorizedException('Email already in use!');

    const user: UserResponse = await this.userService.create({
      email: dto.email,
      password: dto.password,
    });
    const { accessToken, refreshToken } = await this.tokenService.issueTokens(
      user.id,
      user.email,
      metaData,
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async login(
    { email, password }: LoginRequest,
    metaData: SessionMeta,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
  }> {
    const user: User | null = await this.userService.findByEmail(email);

    if (!user || !user.password)
      throw new UnauthorizedException('Invalid credentials!');

    const isValid: boolean = await PasswordUtil.compare(
      password,
      user.password,
    );

    if (!isValid) throw new UnauthorizedException('Password is not valid!');

    const { accessToken, refreshToken } = await this.tokenService.issueTokens(
      user.id,
      user.email,
      metaData,
    );

    return {
      accessToken,
      refreshToken,
      user: UserMapper.toResponse(user),
    };
  }

  async refresh(
    refreshToken: string | undefined,
    meta: SessionMeta,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    if (!refreshToken) throw new UnauthorizedException('No refresh token!');

    const { userId, jti } = this.tokenService.verifyRefresh(refreshToken);
    const user: User | null = await this.userService.findById(userId);

    if (!user) throw new UnauthorizedException('User not found!');

    await this.tokenService.deleteByJtiOrThrow(userId, jti);
    const { accessToken, refreshToken: newRefreshToken } =
      await this.tokenService.issueTokens(user.id, user.email, meta);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string | undefined): Promise<void> {
    if (!refreshToken) return;

    const { userId, jti } = this.tokenService.verifyRefresh(refreshToken);
    const user: User | null = await this.userService.findById(userId);

    if (!user) throw new UnauthorizedException('User not found!');

    await this.tokenService.deleteByJtiOrThrow(userId, jti);
  }
}
