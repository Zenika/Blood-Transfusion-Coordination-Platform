import { CreateMedicalStatusData } from 'src/shared/types/create-medical-status-data.type';
import { MedicalStatusEntity } from '../entities/medical-status.entity';
import { UpdateMedicalStatusData } from 'src/shared/types/update-medical-status-data.type';

export abstract class MedicalStatusRepository {
  abstract create(data: CreateMedicalStatusData): Promise<MedicalStatusEntity>;
  abstract findByUserId(userId: string): Promise<MedicalStatusEntity | null>;
  abstract updateMedicalStatus(
    userId: string,
    data: Partial<UpdateMedicalStatusData>,
  ): Promise<MedicalStatusEntity>;
  abstract updateLastDonationDate(
    userId: string,
    date: Date,
  ): Promise<MedicalStatusEntity>;
}
