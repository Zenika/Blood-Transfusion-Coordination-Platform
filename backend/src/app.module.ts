import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MedicalStatusModule } from './modules/MedicalStatus/medical-status.module';
import { BloodRequestModule } from './modules/bloodRequest/blood-request.module';

@Module({
  imports: [
    BloodRequestModule,
    MedicalStatusModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
