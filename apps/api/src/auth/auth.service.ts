import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PasswordUtil } from '../common/util/PasswordUtil';
import { User } from '@prisma/client';
import { LoginRequest, UserResponse } from '@repo/contracts';
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

    const tokens: { accessToken: string; refreshToken: string } =
      await this.tokenService.issueTokens(user.id, user.email, metaData);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: UserMapper.toResponse(user),
    };
  }

  async refresh(
    refreshToken: string | undefined,
    meta: SessionMeta,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
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
      user: UserMapper.toResponse(user),
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
