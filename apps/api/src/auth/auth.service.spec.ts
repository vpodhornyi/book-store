import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';
import { UnauthorizedException } from '@nestjs/common';
import { PasswordUtil } from '../common/util/PasswordUtil';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let tokenService: TokenService;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTokens = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  };

  const mockMeta = { userAgent: 'test', ip: '127.0.0.1' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            issueTokens: jest.fn().mockResolvedValue(mockTokens),
            verifyRefresh: jest.fn(),
            deleteByJtiOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    tokenService = module.get<TokenService>(TokenService);
  });

  describe('login', () => {
    it('should return tokens and user on valid credentials', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser as any);
      jest.spyOn(PasswordUtil, 'compare').mockResolvedValue(true);

      const result = await service.login(
        { email: 'test@example.com', password: 'password' },
        mockMeta,
      );

      expect(result).toEqual({ ...mockTokens, user: expect.any(Object) });
    });

    it('should throw UnauthorizedException on invalid password', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser as any);
      jest.spyOn(PasswordUtil, 'compare').mockResolvedValue(false);

      await expect(
        service.login(
          { email: 'test@example.com', password: 'wrong' },
          mockMeta,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    it('should issue new tokens if refresh token is valid', async () => {
      jest
        .spyOn(tokenService, 'verifyRefresh')
        .mockReturnValue({ userId: 1, jti: 'jti' });
      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser as any);

      const result = await service.refresh('old-token', mockMeta);

      expect(tokenService.deleteByJtiOrThrow).toHaveBeenCalledWith(1, 'jti');
      expect(result.accessToken).toBe(mockTokens.accessToken);
    });
  });
});
