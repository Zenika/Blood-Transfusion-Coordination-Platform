import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { LoginUseCase } from './application/use-cases/login.use-case';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret-key',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    LoginUseCase,
  ],
})
export class AuthModule {}
