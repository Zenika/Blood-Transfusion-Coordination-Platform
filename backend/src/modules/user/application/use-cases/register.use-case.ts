import { Injectable } from '@nestjs/common';
import { UserResponse } from 'src/shared/types/user-reponse.type';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterDto } from '../../presentation/dto/register.dto';
import { UserValidator } from '../validators/user.validator';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(data: RegisterDto): Promise<UserResponse> {
    await this.userValidator.ensureEmailUnique(data.email);
    const user = await this.userRepository.create(data);
    return user;
  }
}
