import { ConflictException, Injectable } from '@nestjs/common';
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
    const user = await this.userRepository.create(data);
    return UserMapper.toDomain(user);
  }
}
