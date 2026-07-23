import { Module } from '@nestjs/common';
import { BloodRequestRepository } from './domain/repositories/blood-request.repository';
import { PrismaBloodRequestRepository } from './infrastructure/repositories/prisma-blood-request.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { BloodRequestController } from 'src/presentation/controllers/blood-request.controller';
import {
  CreateBloodRequestUseCase,
  GetBloodRequestsUseCase,
  GetBloodRequestUseCase,
  UpdateBloodRequestStatus,
  UpdateBloodRequestUseCase,
} from 'src/use-cases/blood-request.use-case';
import { BloodRequestValidator } from './application/validators/blood-request.validator';
import { UserModule } from '../user/user.module';
import { BloodRequestBuisnessRules } from './domain/buisness-rules/blood-request.rules';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [
    {
      provide: BloodRequestRepository,
      useClass: PrismaBloodRequestRepository,
    },
    CreateBloodRequestUseCase,
    GetBloodRequestUseCase,
    GetBloodRequestsUseCase,
    BloodRequestValidator,
    UpdateBloodRequestUseCase,
    BloodRequestBuisnessRules,
    UpdateBloodRequestUseCase,
    UpdateBloodRequestStatus,
  ],
  controllers: [BloodRequestController],
  exports: [
    BloodRequestValidator,
    BloodRequestRepository,
    BloodRequestBuisnessRules,
  ],
})
export class BloodRequestModule {}
