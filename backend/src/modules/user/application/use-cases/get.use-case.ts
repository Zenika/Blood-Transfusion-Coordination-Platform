import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';

@Injectable()
export class GetUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userId: string) {
    if (!userId) throw new BadRequestException('ID required');
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('user not found');
    return UserMapper.toDomain(user);
  }
}
