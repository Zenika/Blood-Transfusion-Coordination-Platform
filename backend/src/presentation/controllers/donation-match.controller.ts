import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/user/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/shared/types/authenticated-user.type';
import {
  AcceptDonationMatchUseCase,
  DeclinedDonationMatchUseCase,
  GetDonationMatchesByDonorUseCase,
} from 'src/use-cases/donation-match.use-case';

@Controller('donation-matches')
export class DonationMatchController {
  constructor(
    private readonly acceptDonationMatchUseCase: AcceptDonationMatchUseCase,
    private readonly declinedDonationMatchUseCase: DeclinedDonationMatchUseCase,
    private readonly GetDonationMatchesByDonorUseCase: GetDonationMatchesByDonorUseCase,
  ) {}

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async get(@CurrentUser() user: AuthenticatedUser) {
    return await this.GetDonationMatchesByDonorUseCase.execute(user.userId);
  }

  @Patch(':id/accept')
  @ApiParam({ name: 'id', type: 'string', description: 'donation match id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async accept(@Param('id') id: string) {
    return await this.acceptDonationMatchUseCase.execute(id);
  }
  @Patch(':id/decline')
  @ApiParam({ name: 'id', type: 'string', description: 'donation match id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async decline(@Param('id') id: string) {
    return await this.declinedDonationMatchUseCase.execute(id);
  }
}
