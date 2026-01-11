import { Prisma, type User } from '@prisma/client';
import type {
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from '@repo/contracts';
import { PasswordUtil } from '../common/util/PasswordUtil';

export class UserMapper {
  static toResponse(user: User): UserResponse {
    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    if (user.name) {
      userResponse.name = user.name;
    }

    return userResponse;
  }

  static async toCreateData(
    dto: CreateUserRequest,
  ): Promise<Prisma.UserCreateInput> {
    dto.password = await PasswordUtil.hash(dto.password);
    return dto;
  }

  static async toUpdateData(
    dto: UpdateUserRequest,
  ): Promise<Prisma.UserUpdateInput> {
    const data: Prisma.UserUpdateInput = {};

    if (dto.name !== undefined) data.name = dto.name;
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.password !== undefined) {
      data.password = await PasswordUtil.hash(dto.password);
    }
    return data;
  }
}
