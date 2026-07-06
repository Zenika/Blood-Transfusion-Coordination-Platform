import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../presentation/dto/login.dto';
import { AuthResponse } from 'src/shared/types/auth-reponse.type';
import { UserValidator } from '../validators/user.validator';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(data: LoginDto): Promise<AuthResponse> {
    const user = await this.userValidator.ensureUserExistByEmail(data.email);
    await this.userValidator.ensurePasswordValid(user.email, data.password);
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { accessToken };
  }
}
