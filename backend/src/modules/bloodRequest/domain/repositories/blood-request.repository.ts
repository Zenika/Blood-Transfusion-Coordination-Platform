import { CreateBloodRequestData } from 'src/shared/types/create-blood-request-data.type';
import { BloodRequestEntity } from '../entities/blood-request.entity';

export abstract class BloodRequestRepository {
  abstract create(
    patientId: string,
    data: CreateBloodRequestData,
  ): Promise<BloodRequestEntity>;

  abstract findById(bloodRequestId: string): Promise<BloodRequestEntity | null>;
}
