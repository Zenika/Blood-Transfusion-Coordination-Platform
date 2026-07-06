import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserValidator } from '../validators/user.validator';

@Injectable()
export class DeleteUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(userId: string): Promise<void> {
    await this.userValidator.ensureUserExistsById(userId);
    await this.userRepository.delete(userId);
  }
}
