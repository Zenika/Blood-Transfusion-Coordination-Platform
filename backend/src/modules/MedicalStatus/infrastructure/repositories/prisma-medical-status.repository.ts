import { Injectable } from '@nestjs/common';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateMedicalStatusData } from 'src/shared/types/create-medical-status-data.type';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';
import { BloodTypeMapper } from '../mappers/blood-type.mapper';
import { EligibilityStatusMapper } from '../mappers/eligibility-type.mapper';
import { MedicalStatusMapper } from '../mappers/medical-status.mapper';
import { User } from '@prisma/client';
import { UpdateMedicalStatusData } from 'src/shared/types/update-medical-status-data.type';

@Injectable()
export class PrismaMedicalStatus implements MedicalStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async create(
    data: CreateMedicalStatusData,
    userId: string,
  ): Promise<MedicalStatusEntity> {
    const medicalStatus = await this.prisma.medicalStatus.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        dateOfBirth: data.dateOfBirth,
        bloodType: BloodTypeMapper.toPrisma(data.bloodType),
        medicalNotes: data.medicalNotes,
        weight: data.weight,
        height: data.height,
        lastDonationDate: data.lastDonationDate,
        eligibilityStatus: EligibilityStatusMapper.toPrisma(
          data.eligibilityStatus,
        ),
      },
    });
    return MedicalStatusMapper.toDomain(medicalStatus);
  }

  async findById(userId: string): Promise<MedicalStatusEntity | null> {
    const medicalStatus = await this.prisma.medicalStatus.findUnique({
      where: { userId: userId },
    });
    return medicalStatus ? MedicalStatusMapper.toDomain(medicalStatus) : null;
  }

  async updateMedicalStatus(
    data: Partial<UpdateMedicalStatusData>,
    userId: string,
  ): Promise<MedicalStatusEntity> {
    const medicalStatus = await this.prisma.medicalStatus.update({
      where: { userId: userId },
      data,
    });
    return MedicalStatusMapper.toDomain(medicalStatus);
  }
}
