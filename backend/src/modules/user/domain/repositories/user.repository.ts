import { CreateUserData } from 'src/shared/types/create-user-data.type';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserType } from 'src/shared/types/update-user.type';
import { UserRole } from 'src/shared/enums/user-role.enum';

export abstract class UserRepository {
  abstract create(data: CreateUserData): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract update(
    userId: string,
    data: Partial<UpdateUserType>,
  ): Promise<UserEntity>;
  abstract updatePassword(
    userId: string,
    newPassword: string,
  ): Promise<UserEntity>;
  abstract delete(userId: string): Promise<void>;
  abstract updateRole(userId: string, role: UserRole): Promise<UserEntity>;
}
