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
import { MedicalStatusController } from 'src/presentation/controllers/medical-status.controller';
import { MedicalStatusBuisnessRules } from './domain/buisness-rules/medical-status.rules';
import { MedicalStatusValidator } from './application/validators/medical-status.validator';
import { UserModule } from '../user/user.module';

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
    UserModule,
  ],
  providers: [
    { provide: MedicalStatusRepository, useClass: PrismaMedicalStatus },
    CreateMedicalStatusUseCase,
    GetMedicalStatusUseCase,
    UpdateMedicalStatusUseCase,
    UpdateLastDonationDateUseCase,
    MedicalStatusBuisnessRules,
    MedicalStatusValidator,
  ],
  controllers: [MedicalStatusController],
  exports: [MedicalStatusRepository, GetMedicalStatusUseCase],
})
export class MedicalStatusModule {}
