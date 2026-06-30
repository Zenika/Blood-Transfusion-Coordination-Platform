import { MedicalStatus } from '@prisma/client';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';
import { EligibilityStatusMapper } from './eligibility-type.mapper';
import { BloodTypeMapper } from './blood-type.mapper';
import { Gender } from 'src/shared/enums/gender.enum';

export class MedicalStatusMapper {
  static toDomain(data: MedicalStatus): MedicalStatusEntity {
    return {
      id: data.id,
      userId: data.userId,
      gender: data.gender === 'MALE' ? Gender.MALE : Gender.FEMALE,
      bloodType: BloodTypeMapper.toDomain(data.bloodType),
      eligibilityStatus: EligibilityStatusMapper.toDomain(
        data.eligibilityStatus,
      ),
      dateOfBirth: data.dateOfBirth,
      lastDonationDate: data.lastDonationDate,
      weight: data.weight,
      height: data.height,
      medicalNotes: data.medicalNotes,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
