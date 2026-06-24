import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserData } from 'src/shared/types/create-user-data.type';
import { UpdateUserType } from 'src/shared/types/update-user.type';

@Injectable()
export class UpdateUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userId: string, data: Partial<CreateUserData>) {
    if (!userId) {
      throw new BadRequestException('ID required');
    }
    let isEmailExists: UserEntity | null;
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const updatedUser: Partial<UpdateUserType> = {};
    if (data.email) {
      isEmailExists = await this.userRepository.findByEmail(data.email);
      if (isEmailExists) throw new ConflictException('Email aleardy used');
      updatedUser.email = data.email;
    }
    if (data.firstName) updatedUser.firstName = data.firstName;
    if (data.lastName) updatedUser.lastName = data.lastName;
    return await this.userRepository.update(userId, data);
  }
}
