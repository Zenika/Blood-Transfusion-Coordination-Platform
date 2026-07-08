import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserValidator } from 'src/modules/user/application/validators/user.validator';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { LoginDto } from 'src/modules/user/presentation/dto/login.dto';
import { RegisterDto } from 'src/modules/user/presentation/dto/register.dto';
import { UpdatePasswordDto } from 'src/modules/user/presentation/dto/update-password.dto';
import { UpdateUserDto } from 'src/modules/user/presentation/dto/update-user.dto';
import { AuthResponse } from 'src/shared/types/auth-reponse.type';
import { UpdateUserType } from 'src/shared/types/update-user.type';
import { UserResponse } from 'src/shared/types/user-reponse.type';

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

@Injectable()
export class GetUseCase {
  constructor(private readonly userValidator: UserValidator) {}
  async execute(userId: string) {
    const user = await this.userValidator.ensureUserExistsById(userId);
    return user;
  }
}

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

@Injectable()
export class UpdateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(userId: string, data: UpdateUserDto) {
    await this.userValidator.ensureUserExistsById(userId);
    const updatedUser: Partial<UpdateUserType> = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    );
    return await this.userRepository.update(userId, updatedUser);
  }
}
