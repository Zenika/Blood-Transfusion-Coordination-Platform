import { Module } from '@nestjs/common';
import { BloodRequestRepository } from './domain/repositories/blood-request.repository';
import { PrismaBloodRequestRepository } from './infrastructure/repositories/prisma-blood-request.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { BloodRequestController } from 'src/presentation/controllers/blood-request.controller';
import {
  CreateBloodRequestUseCase,
  GetBloodRequestUseCase,
} from 'src/use-cases/blood-request.use-case';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: BloodRequestRepository,
      useClass: PrismaBloodRequestRepository,
    },
    CreateBloodRequestUseCase,
    GetBloodRequestUseCase,
  ],
  controllers: [BloodRequestController],
})
export class BloodRequestModule {}
