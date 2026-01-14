import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('BooksService', () => {
  let service: BooksService;
  let prisma: PrismaService;

  const mockBook = {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of wealth and love',
    price: 10.99,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockBookResponse = {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of wealth and love',
    price: 10.99,
    stock: 100,
    createdAt: mockBook.createdAt.toISOString(),
    updatedAt: mockBook.createdAt.toISOString(),
  };

  const mockPrismaService = {
    book: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      jest.spyOn(prisma.book, 'findMany').mockResolvedValue([mockBook]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      expect(result[0].title).toEqual(mockBook.title);
    });
  });

  describe('findByIdOrThrow', () => {
    it('should return a book if found', async () => {
      jest.spyOn(prisma.book, 'findUnique').mockResolvedValue(mockBook);
      const result = await service.findByIdOrThrow(1);
      expect(result).toEqual(mockBookResponse);
    });

    it('should return null if book not found', async () => {
      jest.spyOn(prisma.book, 'findUnique').mockResolvedValue(null);
      const result = await service.findById(999);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      jest.spyOn(prisma.book, 'delete').mockResolvedValue(mockBook);
      await expect(service.delete(1)).resolves.not.toThrow();
    });

    it('should propagate Prisma P2025 error when book does not exist', async () => {
      const error = new Prisma.PrismaClientKnownRequestError('Message', {
        code: 'P2025',
        clientVersion: 'version',
      });
      jest.spyOn(prisma.book, 'delete').mockRejectedValue(error);
      await expect(service.delete(999)).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });

    it('should propagate Prisma P2003 error when book is referenced', async () => {
      const error = new Prisma.PrismaClientKnownRequestError('Message', {
        code: 'P2003',
        clientVersion: 'version',
      });
      jest.spyOn(prisma.book, 'delete').mockRejectedValue(error);
      await expect(service.delete(1)).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });
  });
});
