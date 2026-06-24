import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class DeleteUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userId: string): Promise<void> {
    if (!userId) throw new BadRequestException('ID required');
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('user not found');
    await this.userRepository.delete(userId);
  }
}
