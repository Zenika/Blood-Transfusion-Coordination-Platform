import { User } from '@prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(user: User): UserEntity {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      hashedPassword: user.hashedPassword,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
