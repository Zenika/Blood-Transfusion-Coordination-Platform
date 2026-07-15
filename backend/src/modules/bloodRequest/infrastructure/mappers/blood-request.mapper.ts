import { BloodRequest, Prisma } from '@prisma/client';
import { BloodRequestEntity } from '../../domain/entities/blood-request.entity';
import { BloodRequestStatusMapper } from './blood-request-status.mapper';
import { BloodTypeMapper } from 'src/modules/MedicalStatus/infrastructure/mappers/blood-type.mapper';
import { UrgencyLevelMapper } from './urgency-level.mapper';
import { UpdateBloodRequestData } from 'src/shared/types/update-blood-request.type';

export class BloodRequestMapper {
  static toDomain(data: BloodRequest): BloodRequestEntity {
    return {
      id: data.id,
      patientId: data.patientId,
      bloodType: BloodTypeMapper.toDomain(data.bloodType),
      urgencyLevel: UrgencyLevelMapper.toDomain(data.urgencyLevel),
      status: BloodRequestStatusMapper.toDomain(data.status),
      medicalReason: data.medicalReason,
      quantity: data.quantity ?? 0,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
  static toPrisma(data: BloodRequestEntity): BloodRequest {
    return {
      id: data.id,
      patientId: data.patientId,
      bloodType: BloodTypeMapper.toPrisma(data.bloodType),
      urgencyLevel: UrgencyLevelMapper.toPrisma(data.urgencyLevel),
      status: BloodRequestStatusMapper.toPrisma(data.status),
      medicalReason: data.medicalReason,
      quantity: data.quantity,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
  static toUpdateInput(
    data: UpdateBloodRequestData,
  ): Prisma.BloodRequestUpdateInput {
    const updateData: Prisma.BloodRequestUpdateInput = {};

    if (data.bloodType !== undefined) {
      updateData.bloodType = BloodTypeMapper.toPrisma(data.bloodType);
    }

    if (data.quantity !== undefined) {
      updateData.quantity = data.quantity;
    }

    if (data.urgencyLevel !== undefined) {
      updateData.urgencyLevel = UrgencyLevelMapper.toPrisma(data.urgencyLevel);
    }

    if (data.status !== undefined) {
      updateData.status = BloodRequestStatusMapper.toPrisma(data.status);
    }

    if (data.medicalReason !== undefined) {
      updateData.medicalReason = data.medicalReason;
    }

    return updateData;
  }
}
