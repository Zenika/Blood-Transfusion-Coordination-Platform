import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/user/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';
import {
  CreateBloodRequestUseCase,
  GetBloodRequestUseCase,
} from 'src/use-cases/blood-request.use-case';
import { createBloodRequestDto } from '../dto/blood-request.dto';

@Controller('blood-request')
export class BloodRequestController {
  constructor(
    private readonly createBloodRequestUseCase: CreateBloodRequestUseCase,
    private readonly getBloodRequestUseCase: GetBloodRequestUseCase,
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

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'blood request id',
  })
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    await this.getBloodRequestUseCase.execute(id);
  }
}
