import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UpdateUserType } from 'src/shared/types/update-user.type';
import { UpdateUserDto } from '../../presentation/dto/update-user.dto';
import { UserValidator } from '../validators/user.validator';

@Injectable()
export class UpdateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(userId: string, data: UpdateUserDto) {
    await this.userValidator.ensureUserExistsById(userId);
    const updatedUser: Partial<UpdateUserType> = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    );
    return await this.userRepository.update(userId, updatedUser);
  }
}
