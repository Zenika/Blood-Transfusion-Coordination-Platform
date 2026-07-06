import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UpdatePasswordDto } from '../../presentation/dto/update-password.dto';
import { UserValidator } from '../validators/user.validator';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(userId: string, data: UpdatePasswordDto) {
    const user = await this.userValidator.ensureUserExistByEmail(userId);
    await this.userValidator.ensurePasswordValid(user.email, data.oldPassword);
    return await this.userRepository.updatePassword(userId, data.newPassword);
  }
}
