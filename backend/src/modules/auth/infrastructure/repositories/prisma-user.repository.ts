import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: any): Promise<any> {
    return await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        hashedPassword: data.password,
      },
    });
  }
  async findByEmail(email: string): Promise<any> {
    return await  this.prisma.user.findUnique({ where: { email } });
  }
}
