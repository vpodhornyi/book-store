import { Injectable } from '@nestjs/common';
import { PrismaErrorUtil } from '../common/util/PrismaErrorUtil';
import type { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper, UserUpdateData } from './user.mapper';
import type {
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from '@repo/contracts';

@Injectable()
export class UsersService {
  private readonly entityName: string = 'User';

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserRequest): Promise<UserResponse> {
    const user: User = await this.prisma.user.create(
      UserMapper.toCreateData(dto),
    );
    return UserMapper.toResponse(user);
  }

  async findAll(): Promise<UserResponse[]> {
    const users: User[] = await this.prisma.user.findMany();
    return users.map((u: User): UserResponse => UserMapper.toResponse(u));
  }

  async findById(id: number): Promise<UserResponse> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw PrismaErrorUtil.handleNotFound(this.entityName);
    }

    return UserMapper.toResponse(user);
  }

  async update(id: number, dto: UpdateUserRequest): Promise<UserResponse> {
    try {
      const updateData: UserUpdateData = await UserMapper.toUpdateData(dto);
      const user: User = await this.prisma.user.update({
        where: { id },
        ...updateData,
      });

      return UserMapper.toResponse(user);
    } catch (e) {
      PrismaErrorUtil.handle(e, this.entityName);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      PrismaErrorUtil.handle(e, this.entityName);
    }
  }
}
