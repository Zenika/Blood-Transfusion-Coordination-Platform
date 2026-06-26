import { Injectable } from '@nestjs/common';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateMedicalStatusData } from 'src/shared/types/create-medical-status-data.type';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';
import { BloodTypeMapper } from '../mappers/blood-type.mapper';
import { EligibilityStatusMapper } from '../mappers/eligibility-type.mapper';
import { MedicalStatusMapper } from '../mappers/medical-status.mapper';

@Injectable()
export class PrismaMedicalStatus implements MedicalStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

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
}
