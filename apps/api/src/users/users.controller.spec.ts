import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserResponse = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUserResponse),
            findAll: jest.fn().mockResolvedValue([mockUserResponse]),
            findByIdOrThrow: jest.fn().mockResolvedValue(mockUserResponse),
            update: jest.fn().mockResolvedValue(mockUserResponse),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUserResponse);
    });
  });

  describe('getById', () => {
    it('should return a user response', async () => {
      const result = await controller.getById(1);
      expect(service.findByIdOrThrow).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUserResponse);
    });
  });

  describe('remove', () => {
    it('should call service.remove', async () => {
      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
