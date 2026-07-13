import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/user/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';
import { CreateBloodRequestUseCase } from 'src/use-cases/create-blood-request.use-case';
import { createBloodRequestDto } from '../dto/blood-request.dto';

@Controller('blood-request')
export class BloodRequestController {
  constructor(
    private readonly createBloodRequestUseCase: CreateBloodRequestUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async register(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: createBloodRequestDto,
  ) {
    await this.createBloodRequestUseCase.execute(user.userId, dto);
  }
}
