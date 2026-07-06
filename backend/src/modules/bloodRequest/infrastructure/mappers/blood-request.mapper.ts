import { BloodRequest } from '@prisma/client';
import { BloodRequestEntity } from '../../domain/entities/blood-request.entity';
import { BloodRequestStatusMapper } from './blood-request-status.mapper';
import { BloodTypeMapper } from 'src/modules/MedicalStatus/infrastructure/mappers/blood-type.mapper';
import { UrgencyLevelMapper } from './urgency-level.mapper';

export class BloodRequestMapper {
  static toDomain(data: BloodRequest): BloodRequestEntity {
    return {
      id: data.id,
      patientId: data.patientId,
      bloodType: BloodTypeMapper.toDomain(data.bloodType),
      urgencyLevel: UrgencyLevelMapper.toDomain(data.urgencyLevel),
      status: BloodRequestStatusMapper.toDomain(data.status),
      medicalReason: data.medicalReason,
      quantity: data.quantity,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
