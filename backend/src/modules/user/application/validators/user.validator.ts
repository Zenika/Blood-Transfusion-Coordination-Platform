import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserValidator {
  constructor(private readonly userRepository: UserRepository) {}
  async ensureUserExistsById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async ensureEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (user) throw new ConflictException('Email aleardy exists');
  }
  async ensureUserExistByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async ensurePasswordValid(email: string, password: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid crendentials');
    }
  }
}
