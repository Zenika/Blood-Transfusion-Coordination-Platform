import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateUserData } from 'src/shared/types/create-user-data.type';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import * as bcrypt from 'bcrypt';
import { UpdateUserType } from 'src/shared/types/update-user.type';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserData): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        hashedPassword: hashedPassword,
        phoneNumber: data.phoneNumber,
      },
    });
    return UserMapper.toDomain(user);
  }
  async findByEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return UserMapper.toDomain(user);
  }
  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return UserMapper.toDomain(user);
  }
  async update(
    userId: string,
    data: Partial<UpdateUserType>,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });

    return UserMapper.toDomain(user);
  }

  async updatePassword(
    userId: string,
    newPassword: string,
  ): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { hashedPassword },
    });
    return UserMapper.toDomain(user);
  }
}
