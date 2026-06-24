import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UpdateUseCase } from './application/use-cases/update-user.use-case';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { UpdatePasswordUseCase } from './application/use-cases/update-password.use-case';
import { DeleteUseCase } from './application/use-cases/delete.use-case';

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
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    RegisterUseCase,
    LoginUseCase,
    UpdateUseCase,
    UpdatePasswordUseCase,
    DeleteUseCase,
    JwtStrategy,
  ],
  controllers: [UserController],
})
export class UserModule {}
