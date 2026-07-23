import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CreateDonationMatchesUseCase } from 'src/use-cases/donation-match.use-case';
import { DonationMatchRepository } from './domain/repositories/donation-match.repository';
import { PrismaDonationMatchRepository } from './infrastructure/repository/prisma-donation-match.repository';
import { MedicalStatusModule } from '../MedicalStatus/medical-status.module';
import { BloodRequestModule } from '../bloodRequest/blood-request.module';

@Module({
  imports: [PrismaModule, MedicalStatusModule, BloodRequestModule],
  providers: [
    {
      provide: DonationMatchRepository,
      useClass: PrismaDonationMatchRepository,
    },
    CreateDonationMatchesUseCase,
  ],
})
export class DonationMatchModule {}
