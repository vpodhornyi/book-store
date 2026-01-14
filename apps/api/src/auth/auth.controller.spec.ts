import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthResponse = {
    accessToken: 'access',
    refreshToken: 'refresh',
    user: { id: 1, email: 'test@test.com' },
  };

  const mockRes = {
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  } as unknown as Response;

  const mockReq = {
    headers: { 'user-agent': 'test-agent' },
    ip: '127.0.0.1',
    cookies: {},
  } as unknown as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(mockAuthResponse),
            register: jest.fn().mockResolvedValue(mockAuthResponse),
            refresh: jest.fn().mockResolvedValue(mockAuthResponse),
            logout: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should set refreshToken cookie and return access token', async () => {
      const dto = { email: 'test@test.com', password: 'password' };
      const result = await controller.login(dto, mockReq, mockRes);

      expect(service.login).toHaveBeenCalled();
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'refreshToken',
        'refresh',
        expect.objectContaining({ httpOnly: true }),
      );
      expect(result).toEqual({
        accessToken: 'access',
        user: mockAuthResponse.user,
      });
    });
  });

  describe('logout', () => {
    it('should clear the refreshToken cookie', async () => {
      (mockReq as any).cookies = { refreshToken: 'token' };
      
      const result = await controller.logout(mockReq, mockRes);

      expect(service.logout).toHaveBeenCalledWith('token');
      expect(mockRes.clearCookie).toHaveBeenCalledWith('refreshToken', expect.any(Object));
      expect(result).toEqual({ ok: true });
    });
  });
});
