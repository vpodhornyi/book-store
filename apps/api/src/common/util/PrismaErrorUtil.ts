import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const getNotFoundMessage = (entityName: string) => `${entityName} not found`;

export class PrismaErrorUtil {
  static handle(error: unknown, entityName: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2025': // Not found
          throw new NotFoundException(getNotFoundMessage(entityName));
        case 'P2002': // Unique constraint failed (e.g. email exists)
          throw new ConflictException(`${entityName} already exists`);
        case 'P2003': // Foreign key constraint failed
          throw new ConflictException(
            `${entityName} is referenced by other entities and cannot be deleted`,
          );
      }
    }
    throw error;
  }

  static handleNotFound(entityName: string): NotFoundException {
    return new NotFoundException(getNotFoundMessage(entityName));
  }
}
