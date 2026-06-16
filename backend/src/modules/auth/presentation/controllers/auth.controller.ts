import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '../dto/register.dto';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginDto } from '../dto/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { JwtAuthGuard } from '../../infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}
