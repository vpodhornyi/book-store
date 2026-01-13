import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    const accessSecret = process.env.JWT_ACCESS_SECRET;

    if (!accessSecret) {
      throw new Error('JWT_ACCESS_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessSecret,
    });
  }

  validate(payload: { sub: string; email?: string }) {
    return { userId: payload.sub, email: payload.email };
  }
}
