import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { UserMapper } from './user.mapper';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserResponse = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    createdAt: mockUser.createdAt.toISOString(),
    updatedAt: mockUser.updatedAt.toISOString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue(mockUser),
              findMany: jest.fn().mockResolvedValue([mockUser]),
              findUnique: jest.fn().mockResolvedValue(mockUser),
              update: jest.fn().mockResolvedValue(mockUser),
              delete: jest.fn().mockResolvedValue(mockUser),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto = {
        email: 'test1@example.com',
        password: 'password',
        name: 'Test User',
      };
      jest.spyOn(UserMapper, 'toCreateData').mockResolvedValue(dto as any);

      const result = await service.create(dto);

      expect(prisma.user.create).toHaveBeenCalled();
      expect(result).toEqual(mockUserResponse);
    });
  });

  describe('findByIdOrThrow', () => {
    it('should return a user if found', async () => {
      const result = await service.findByIdOrThrow(1);
      expect(result).toEqual(mockUserResponse);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      await expect(service.findByIdOrThrow(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should call delete', async () => {
      await service.remove(1);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});