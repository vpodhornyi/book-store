import ms from 'ms';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SessionMeta } from '../types/session-meta.type';
import { PasswordUtil } from '../common/util/PasswordUtil';
import { PrismaService } from '../prisma/prisma.service';
import { type RefreshToken } from '@prisma/client';

const JWT_ACCESS_TTL = 'JWT_ACCESS_TTL';
const JWT_REFRESH_TTL = 'JWT_REFRESH_TTL';
const JWT_ACCESS_SECRET = 'JWT_ACCESS_SECRET';
const JWT_REFRESH_SECRET = 'JWT_REFRESH_SECRET';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  public async findUniq(jti: string): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findUnique({ where: { jti } });
  }

  public async removeByJti(jti: string): Promise<void> {
    await this.prisma.refreshToken.delete({ where: { jti } });
  }

  public async issueTokens(
    userId: number,
    email: string,
    metaData: SessionMeta,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const jti = randomUUID();
    const accessToken = this.signAccess(userId, email);
    const refreshToken = this.signRefresh(userId, jti);

    const data = {
      jti,
      tokenHash: await PasswordUtil.hash(refreshToken),
      userId,
      ...metaData,
      expiresAt: this.getRefreshExpiresAt(),
    };

    await this.prisma.refreshToken.create({ data });

    return { accessToken, refreshToken };
  }

  public verifyRefresh(refreshToken: string): { userId: number; jti: string } {
    try {
      const payload: { sub: number; jti: string } = this.jwt.verify(
        refreshToken,
        {
          secret: this.config.getOrThrow<string>(JWT_REFRESH_SECRET),
        },
      );
      return { userId: payload.sub, jti: payload.jti };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  public async deleteByJtiOrThrow(userId: number, jti: string): Promise<void> {
    const row: RefreshToken | null = await this.findUniq(jti);

    if (!row || row.userId !== userId || row.expiresAt <= new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.removeByJti(jti);
  }

  private signAccess(userId: number, email: string): string {
    const payload = { sub: userId, email };
    const opts: JwtSignOptions = this.getOptions(
      JWT_ACCESS_SECRET,
      JWT_ACCESS_TTL,
    );
    return this.jwt.sign(payload, opts);
  }

  private signRefresh(userId: number, jti: string): string {
    const payload = { sub: userId, jti };
    const opts: JwtSignOptions = this.getOptions(
      JWT_REFRESH_SECRET,
      JWT_REFRESH_TTL,
    );
    return this.jwt.sign(payload, opts);
  }

  private getOptions(secret: string, ttl: string): JwtSignOptions {
    return {
      secret: this.config.getOrThrow<string>(secret),
      expiresIn: this.config.getOrThrow<string>(ttl) as ms.StringValue,
    };
  }

  private getRefreshExpiresAt(): Date {
    const ttl = this.config.getOrThrow<string>(JWT_REFRESH_TTL);
    return this.calculateExpirationDate(ttl);
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
