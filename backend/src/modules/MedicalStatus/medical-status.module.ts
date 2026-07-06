import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { MedicalStatusRepository } from './domain/repositories/medical-status.repository';
import { PrismaMedicalStatus } from './infrastructure/repositories/prisma-medical-status.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CreateMedicalStatusUseCase,
  GetMedicalStatusUseCase,
  UpdateMedicalStatusUseCase,
  UpdateLastDonationDateUseCase,
} from 'src/use-cases/medical-status.use-cases';
import { MedicalStatusController } from 'src/controllers/medical-status.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [
    { provide: MedicalStatusRepository, useClass: PrismaMedicalStatus },
    CreateMedicalStatusUseCase,
    GetMedicalStatusUseCase,
    UpdateMedicalStatusUseCase,
    UpdateLastDonationDateUseCase,
  ],
  controllers: [MedicalStatusController],
})
export class MedicalStatusModule {}
