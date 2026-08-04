import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/user/infrastructure/guards/jwt-auth.guard';
import {
  AcceptDonationMatchUseCase,
  DeclinedDonationMatchUseCase,
} from 'src/use-cases/donation-match.use-case';

@Controller('donation-match')
export class DonationMatchController {
  constructor(
    private readonly acceptDonationMatchUseCase: AcceptDonationMatchUseCase,
    private readonly declinedDonationMatchUseCase: DeclinedDonationMatchUseCase,
  ) {}
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
