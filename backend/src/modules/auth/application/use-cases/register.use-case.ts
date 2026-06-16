import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterDto } from '../../presentation/dto/register.dto';
import { UserResponse } from 'src/shared/types/user-reponse.type';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(data: RegisterDto): Promise<UserResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email aleardy exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      hashedPassword: hashedPassword,
    });
    return UserMapper.toDomain(user);
  }
}
