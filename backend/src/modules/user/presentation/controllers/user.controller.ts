import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdatePasswordUseCase } from '../../application/use-cases/update-password.use-case';
import { DeleteUseCase } from '../../application/use-cases/delete.use-case';
import { GetUseCase } from '../../application/use-cases/get.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly getUseCase: GetUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
    private readonly deleteUseCase: DeleteUseCase,
  ) {}
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'user id' })
  get(@Param('id') id: string) {
    return this.getUseCase.execute(id);
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

  @Put(':id/password')
  @ApiParam({ name: 'id', type: 'string', description: 'user id' })
  updatePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    return this.updatePasswordUseCase.execute(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'user id' })
  delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}
