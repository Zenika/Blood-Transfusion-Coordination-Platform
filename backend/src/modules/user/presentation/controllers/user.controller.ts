import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { UpdateUseCase } from '../../application/use-cases/update-user.use-case';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';
import { JwtAuthGuard } from '../../infrastructure/guards/jwt-auth.guard';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly updateUseCase: UpdateUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto); //ajouter un mapper
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
  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'user id' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUseCase.execute(id, dto);
  }
}
