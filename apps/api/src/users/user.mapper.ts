import { User } from '@prisma/client';
import type {
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from '@repo/contracts';
import { PasswordUtil } from '../common/util/PasswordUtil';

export type UserUpdateData = {
  data: {
    name?: string;
    email?: string;
    password?: string;
  };
};

export class UserMapper {
  static toResponse(user: User): UserResponse {
    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    if (user.name) {
      userResponse.name = user.name;
    }

    return userResponse;
  }

  static toCreateData(dto: CreateUserRequest) {
    return {
      data: {
        ...dto,
      },
    };
  }

  static async toUpdateData(dto: UpdateUserRequest) {
    const data: UserUpdateData['data'] = {};

    if (dto.name !== undefined) data.name = dto.name;
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.password !== undefined) {
      data.password = await PasswordUtil.hash(dto.password);
    }
    return { data };
  }
}
