import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { UsersService } from '../users/users.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, TokenService, JwtAccessStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
