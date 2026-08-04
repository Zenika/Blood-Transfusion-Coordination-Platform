import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import {
  AcceptDonationMatchUseCase,
  CreateDonationMatchesUseCase,
  DeclinedDonationMatchUseCase,
  GetDonationMatchesByDonorUseCase,
} from 'src/use-cases/donation-match.use-case';
import { DonationMatchRepository } from './domain/repositories/donation-match.repository';
import { PrismaDonationMatchRepository } from './infrastructure/repository/prisma-donation-match.repository';
import { MedicalStatusModule } from '../MedicalStatus/medical-status.module';
import { BloodRequestModule } from '../bloodRequest/blood-request.module';
import { DonationMatchController } from 'src/presentation/controllers/donation-match.controller';
import { DonationMatchBuisnessRules } from './domain/buisness-rules/donation-match.buisness-rules';

@Module({
  imports: [
    PrismaModule,
    MedicalStatusModule,
    forwardRef(() => BloodRequestModule),
  ],
  providers: [
    {
      provide: DonationMatchRepository,
      useClass: PrismaDonationMatchRepository,
    },
    CreateDonationMatchesUseCase,
    AcceptDonationMatchUseCase,
    DonationMatchBuisnessRules,
    DeclinedDonationMatchUseCase,
    GetDonationMatchesByDonorUseCase,
  ],
  exports: [CreateDonationMatchesUseCase],
  controllers: [DonationMatchController],
})
export class DonationMatchModule {}
