import { CreateUserData } from 'src/shared/types/create-user-data.type';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(data: CreateUserData): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
