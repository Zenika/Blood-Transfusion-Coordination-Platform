import { CreateBloodRequestData } from 'src/shared/types/create-blood-request-data.type';
import { BloodRequestEntity } from '../../domain/entities/blood-request.entity';
import { BloodRequestRepository } from '../../domain/repositories/blood-request.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { BloodRequestStatusMapper } from '../mappers/blood-request-status.mapper';
import { UrgencyLevelMapper } from '../mappers/urgency-level.mapper';
import { BloodTypeMapper } from 'src/modules/MedicalStatus/infrastructure/mappers/blood-type.mapper';
import { BloodRequestMapper } from '../mappers/blood-request.mapper';

export class PrismaBloodRequestRepository implements BloodRequestRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    patientId: string,
    data: CreateBloodRequestData,
  ): Promise<BloodRequestEntity> {
    const BloodRequest = await this.prisma.bloodRequest.create({
      data: {
        patient: {
          connect: { id: patientId },
        },
        bloodType: BloodTypeMapper.toPrisma(data.bloodType),
        urgencyLevel: UrgencyLevelMapper.toPrisma(data.urgencyLevel),
        status: BloodRequestStatusMapper.toPrisma(data.status),
        medicalReason: data.medicalReason,
        quantity: data.quantity,
      },
    });
    return BloodRequestMapper.toDomain(BloodRequest);
  }
}
