import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, type User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from './user.mapper';
import type {
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from '@repo/contracts';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserRequest): Promise<UserResponse> {
    const data: Prisma.UserCreateInput = await UserMapper.toCreateData(dto);
    const user: User = await this.prisma.user.create({ data });
    return UserMapper.toResponse(user);
  }

  async findAll(): Promise<UserResponse[]> {
    const users: User[] = await this.prisma.user.findMany();
    return users.map((u: User): UserResponse => UserMapper.toResponse(u));
  }

  async findByIdOrThrow(id: number): Promise<UserResponse> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found!');

    return UserMapper.toResponse(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmailOrThrow(email: string): Promise<UserResponse> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found!');

    return UserMapper.toResponse(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, dto: UpdateUserRequest): Promise<UserResponse> {
    const data: Prisma.UserUpdateInput = await UserMapper.toUpdateData(dto);
    const user: User = await this.prisma.user.update({
      where: { id },
      data,
    });

    return UserMapper.toResponse(user);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
