import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/user/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';
import {
  CreateBloodRequestUseCase,
  GetBloodRequestsUseCase,
  GetBloodRequestUseCase,
  UpdateBloodRequestStatus,
  UpdateBloodRequestUseCase,
} from 'src/use-cases/blood-request.use-case';
import {
  createBloodRequestDto,
  UpdateBloodRequestDto,
  UpdateBloodRequestStatusDto,
} from '../dto/blood-request.dto';

@Controller('blood-request')
export class BloodRequestController {
  constructor(
    private readonly createBloodRequestUseCase: CreateBloodRequestUseCase,
    private readonly getBloodRequestUseCase: GetBloodRequestUseCase,
    private readonly getBloodRequestsUseCase: GetBloodRequestsUseCase,
    private readonly updateBloodRequestUseCase: UpdateBloodRequestUseCase,
    private readonly updateBloodRequestStatus: UpdateBloodRequestStatus,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async register(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: createBloodRequestDto,
  ) {
    return await this.createBloodRequestUseCase.execute(user.userId, dto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'blood request id',
  })
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    return await this.getBloodRequestUseCase.execute(id);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getAll(@CurrentUser() user: AuthenticatedUser) {
    return await this.getBloodRequestsUseCase.execute(user.userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBloodRequestDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return await this.updateBloodRequestUseCase.execute(id, user.userId, dto);
  }

  @Patch('status/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async UpdateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateBloodRequestStatusDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return await this.updateBloodRequestStatus.execute(
      id,
      user.userId,
      dto.status,
    );
  }
}
