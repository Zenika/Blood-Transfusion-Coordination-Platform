import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/user/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';
import { CreateMedicalStatusDto } from '../dto/create-medical-status.dto';
import { CreateMedicalStatusUseCase } from '../../application/use-cases/register-medical-status.use-case';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('medical-status')
export class MedicalStatusController {
  constructor(
    private readonly createMedicalStatusUseCase: CreateMedicalStatusUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async register(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateMedicalStatusDto,
  ) {
    return await this.createMedicalStatusUseCase.execute(dto, user.userId);
  }
}
