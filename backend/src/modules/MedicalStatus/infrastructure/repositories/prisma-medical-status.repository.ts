import { Injectable } from '@nestjs/common';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateMedicalStatusData } from 'src/shared/types/create-medical-status-data.type';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';
import { BloodTypeMapper } from '../mappers/blood-type.mapper';
import { MedicalStatusMapper } from '../mappers/medical-status.mapper';
import { UpdateMedicalStatusData } from 'src/shared/types/update-medical-status-data.type';

@Injectable()
export class PrismaMedicalStatusRepository implements MedicalStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMedicalStatusData): Promise<MedicalStatusEntity> {
    const medicalStatus = await this.prisma.medicalStatus.create({
      data: {
        userId: data.userId,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        bloodType: BloodTypeMapper.toPrisma(data.bloodType),
        medicalNotes: data.medicalNotes,
        weight: data.weight,
        height: data.height,
        lastDonationDate: data.lastDonationDate,
      },
    });
    return MedicalStatusMapper.toDomain(medicalStatus);
  }

  async findByUserId(userId: string): Promise<MedicalStatusEntity | null> {
    const medicalStatus = await this.prisma.medicalStatus.findUnique({
      where: { userId: userId },
    });
    return medicalStatus ? MedicalStatusMapper.toDomain(medicalStatus) : null;
  }

  async updateMedicalStatus(
    userId: string,
    data: Partial<UpdateMedicalStatusData>,
  ): Promise<MedicalStatusEntity> {
    const medicalStatus = await this.prisma.medicalStatus.update({
      where: { userId: userId },
      data,
    });
    return MedicalStatusMapper.toDomain(medicalStatus);
  }

  async updateLastDonationDate(
    userId: string,
    date: Date,
  ): Promise<MedicalStatusEntity> {
    const medicalStatus = await this.prisma.medicalStatus.update({
      where: { userId: userId },
      data: { lastDonationDate: date },
    });
    return MedicalStatusMapper.toDomain(medicalStatus);
  }
}
