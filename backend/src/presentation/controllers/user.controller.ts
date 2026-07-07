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

import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';
import { JwtAuthGuard } from '../../modules/user/infrastructure/guards/jwt-auth.guard';

import {
  RegisterUseCase,
  LoginUseCase,
  GetUseCase,
  UpdateUseCase,
  UpdatePasswordUseCase,
  DeleteUseCase,
} from 'src/use-cases/user.use-cases';
import {
  RegisterDto,
  LoginDto,
  UpdateUserDto,
  UpdatePasswordDto,
} from '../dto/user.dto';

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
