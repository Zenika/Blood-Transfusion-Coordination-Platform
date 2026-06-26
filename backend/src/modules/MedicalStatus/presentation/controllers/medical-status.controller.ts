import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/user/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';
import { CreateMedicalStatusDto } from '../dto/create-medical-status.dto';
import { CreateMedicalStatusUseCase } from '../../application/use-cases/register-medical-status.use-case';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetMedicalStatusUseCase } from '../../application/use-cases/get-medical-status.use-case';
import { UpdateMedicalStatusUseCase } from '../../application/use-cases/update-medical-status.use-case';
import { UpdateMedicalStatusDto } from '../dto/update-medical-status.dto';

@Controller('medical-status')
export class MedicalStatusController {
  constructor(
    private readonly createMedicalStatusUseCase: CreateMedicalStatusUseCase,
    private readonly getMedicalStatusUseCase: GetMedicalStatusUseCase,
    private readonly updateMedicalStatusUseCase: UpdateMedicalStatusUseCase,
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@CurrentUser() user: AuthenticatedUser) {
    return await this.getMedicalStatusUseCase.execute(user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateMedicalStatusDto,
  ) {
    return await this.updateMedicalStatusUseCase.execute(dto, user.userId);
  }
}
