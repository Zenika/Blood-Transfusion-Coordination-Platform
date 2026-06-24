import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UpdatePasswordDto } from '../../presentation/dto/update-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userId: string, data: UpdatePasswordDto) {
    if (!userId) {
      throw new BadRequestException('ID required ');
    }
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(data.oldPassword, user.hashedPassword);
    if (!isMatch) throw new UnauthorizedException('Password Incorect');
    return await this.userRepository.updatePassword(userId, data.newPassword);
  }
}
