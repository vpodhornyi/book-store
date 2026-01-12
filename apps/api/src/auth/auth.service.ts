import ms from 'ms';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PasswordUtil } from '../common/util/PasswordUtil';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { LoginRequest, AuthResponse } from '@repo/contracts';
import { UserMapper } from '../users/user.mapper';

const JWT_ACCESS_SECRET = 'JWT_ACCESS_SECRET';
const JWT_ACCESS_TTL = 'JWT_ACCESS_TTL';
const JWT_REFRESH_SECRET = 'JWT_REFRESH_SECRET';
const JWT_REFRESH_TTL = 'JWT_REFRESH_TTL';
const PASSWORD_IS_NOT_VALID = 'Password is not valid!';
const getUnauthorizedError = (email: string): string =>
  `User with email: ${email} not found`;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginRequest): Promise<AuthResponse> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.password || !user.email) {
      throw new UnauthorizedException(getUnauthorizedError(dto.email));
    }

    await this.validatePassword(dto.password, user.password);

    const tokens: { accessToken: string; refreshToken: string } =
      await this.issueTokens(user.id, user.email);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: UserMapper.toResponse(user),
    };
  }

  private async validatePassword(
    dtoPassword: string,
    userPassword: string,
  ): Promise<void> {
    const isValid = await PasswordUtil.compare(dtoPassword, userPassword);

    if (!isValid) {
      throw new UnauthorizedException(PASSWORD_IS_NOT_VALID);
    }
  }

  private async issueTokens(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email };
    const accessOptions: JwtSignOptions = {
      secret: this.configService.getOrThrow<string>(JWT_ACCESS_SECRET),
      expiresIn: this.configService.getOrThrow<string>(
        JWT_ACCESS_TTL,
      ) as ms.StringValue,
    };
    const refreshOptions: JwtSignOptions = {
      secret: this.configService.getOrThrow<string>(JWT_REFRESH_SECRET),
      expiresIn: this.configService.getOrThrow<string>(
        JWT_REFRESH_TTL,
      ) as ms.StringValue,
    };
    const accessToken = await this.jwtService.signAsync(payload, accessOptions);

    const refreshToken = await this.jwtService.signAsync(
      payload,
      refreshOptions,
    );
    const refreshTtl = this.configService.getOrThrow<string>(JWT_REFRESH_TTL);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: await PasswordUtil.hash(refreshToken),
        userId,
        expiresAt: new Date(this.calculateExpirationDate(refreshTtl)),
      },
    });

    return { accessToken, refreshToken };
  }

  private calculateExpirationDate(ttl: string): Date {
    const match = ttl.match(/^(\d+)([dmhs])$/);
    if (!match) return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const value = parseInt(match[1]);
    const unit = match[2];
    const msMap: Record<string, number> = {
      d: 24 * 60 * 60 * 1000,
      h: 60 * 60 * 1000,
      m: 60 * 1000,
      s: 1000,
    };

    return new Date(Date.now() + value * msMap[unit]);
  }
}
