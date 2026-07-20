import { Module } from '@nestjs/common';
import { UserController } from '../../presentation/controllers/user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import {
  RegisterUseCase,
  LoginUseCase,
  UpdateUseCase,
  UpdatePasswordUseCase,
  DeleteUseCase,
  GetUseCase,
} from 'src/use-cases/user.use-cases';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { UserValidator } from './application/validators/user.validator';

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
    GetUseCase,
    JwtStrategy,
    UserValidator,
  ],
  controllers: [UserController],
  exports: [UserValidator],
})
export class UserModule {}
