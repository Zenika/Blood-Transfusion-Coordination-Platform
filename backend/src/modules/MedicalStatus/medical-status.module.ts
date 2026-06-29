import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { MedicalStatusRepository } from './domain/repositories/medical-status.repository';
import { PrismaMedicalStatus } from './infrastructure/repositories/prisma-medical-status.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MedicalStatusController } from './presentation/controllers/medical-status.controller';
import { CreateMedicalStatusUseCase } from './application/use-cases/register-medical-status.use-case';
import { GetMedicalStatusUseCase } from './application/use-cases/get-medical-status.use-case';
import { UpdateMedicalStatusUseCase } from './application/use-cases/update-medical-status.use-case';
import { UpdateLastDonationDateUseCase } from './application/use-cases/update-last-donation-date.use-case';

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
