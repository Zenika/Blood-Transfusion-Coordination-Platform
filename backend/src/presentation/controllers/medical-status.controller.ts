import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/user/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';
import { ApiBearerAuth } from '@nestjs/swagger';

import {
  CreateMedicalStatusUseCase,
  GetMedicalStatusUseCase,
  UpdateMedicalStatusUseCase,
  UpdateLastDonationDateUseCase,
} from 'src/use-cases/medical-status.use-cases';
import {
  CreateMedicalStatusDto,
  UpdateMedicalStatusDto,
  UpdatelastDonationDateDto,
} from '../dto/medical-status.dto';

@Controller('medical-status')
export class MedicalStatusController {
  constructor(
    private readonly createMedicalStatusUseCase: CreateMedicalStatusUseCase,
    private readonly getMedicalStatusUseCase: GetMedicalStatusUseCase,
    private readonly updateMedicalStatusUseCase: UpdateMedicalStatusUseCase,
    private readonly updateLastDonationDateUseCase: UpdateLastDonationDateUseCase,
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('last-donation-date')
  async updateLastDonationDate(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdatelastDonationDateDto,
  ) {
    return await this.updateLastDonationDateUseCase.execute(user.userId, dto);
  }
}
