import { CreateMedicalStatusData } from 'src/shared/types/create-medical-status-data.type';
import { MedicalStatusEntity } from '../entities/medical-status.entity';
import { User } from '@prisma/client';
import { UpdateMedicalStatusData } from 'src/shared/types/update-medical-status-data.type';

export abstract class MedicalStatusRepository {
  abstract create(
    data: CreateMedicalStatusData,
    userId: string,
  ): Promise<MedicalStatusEntity>;
  abstract findById(userId: string): Promise<MedicalStatusEntity | null>;
  abstract findUserById(id: string): Promise<User | null>;
  abstract updateMedicalStatus(
    data: Partial<UpdateMedicalStatusData>,
    userId: string,
  ): Promise<MedicalStatusEntity>;
}
