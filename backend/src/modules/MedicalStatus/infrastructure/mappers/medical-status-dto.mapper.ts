import { CreateMedicalStatusDto } from '../../presentation/dto/create-medical-status.dto';
import { CreateMedicalStatusData } from 'src/shared/types/create-medical-status-data.type';

export class MedicalStatusDtoMapper {
  static toDomain(data: CreateMedicalStatusDto): CreateMedicalStatusData {
    return {
      dateOfBirth: new Date(data.dateOfBirth),
      lastDonationDate: data.lastDonationDate
        ? new Date(data.lastDonationDate)
        : null,
      height: data.height ? data.height : null,
      medicalNotes: data.medicalNotes ? data.medicalNotes : null,
      weight: data.weight,
      bloodType: data.bloodType,
      eligibilityStatus: data.eligibilityStatus,
    };
  }
}
