import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/user/infrastructure/guards/jwt-auth.guard';
import { AcceptDonationMatchUseCase } from 'src/use-cases/donation-match.use-case';

@Controller('donation-match')
export class DonationMatchController {
  constructor(
    private readonly acceptDonationMatchUseCase: AcceptDonationMatchUseCase,
  ) {}
  @Patch(':id/accept')
  @ApiParam({ name: 'id', type: 'string', description: 'donation match id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string) {
    return await this.acceptDonationMatchUseCase.execute(id);
  }
}
