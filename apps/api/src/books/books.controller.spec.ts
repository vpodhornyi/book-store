import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBookResponse = {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of wealth and love',
    price: 10.99,
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockBooksService = {
    findAll: jest.fn(),
    findByIdOrThrow: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of books response', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockBookResponse]);
      const result = await controller.getAll();
      expect(result).toEqual([mockBookResponse]);
    });
  });

  describe('getById', () => {
    it('should return a book', async () => {
      jest.spyOn(service, 'findByIdOrThrow').mockResolvedValue(mockBookResponse);
      const result = await controller.getById(1);
      expect(service.findByIdOrThrow).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockBookResponse);
    });
  });

  describe('addBook', () => {
    it('should create a book', async () => {
      const createDto = {
        title: 'New Book',
        author: 'Author',
        price: 15,
        stock: 10,
      };
      jest.spyOn(service, 'create').mockResolvedValue(mockBookResponse);
      const result = await controller.addBook(createDto);
      expect(result).toEqual(mockBookResponse);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);
      await expect(controller.deleteBook(1)).resolves.toBeUndefined();
    });
  });
});
