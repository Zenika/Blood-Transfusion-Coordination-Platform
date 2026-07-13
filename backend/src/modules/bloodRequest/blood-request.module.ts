import { Module } from '@nestjs/common';
import { BloodRequestRepository } from './domain/repositories/blood-request.repository';
import { PrismaBloodRequestRepository } from './infrastructure/repositories/prisma-blood-request.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CreateBloodRequestUseCase } from './application/create-blood-request.use-case';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: BloodRequestRepository,
      useClass: PrismaBloodRequestRepository,
    },
    CreateBloodRequestUseCase,
  ],
  controllers: [],
})
export class BloodRequestModule {}
