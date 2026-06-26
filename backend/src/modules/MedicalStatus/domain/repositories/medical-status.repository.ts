import { CreateMedicalStatusData } from 'src/shared/types/create-medical-status-data.type';
import { MedicalStatusEntity } from '../entities/medical-status.entity';

export abstract class MedicalStatusRepository {
  abstract create(
    data: CreateMedicalStatusData,
    userId: string,
  ): Promise<MedicalStatusEntity>;
}
