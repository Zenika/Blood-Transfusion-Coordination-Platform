import { CreateBloodRequestData } from 'src/shared/types/create-blood-request-data.type';
import { BloodRequestEntity } from '../entities/blood-request.entity';
import { UpdateBloodRequestData } from 'src/shared/types/update-blood-request.type';

export abstract class BloodRequestRepository {
  abstract create(
    patientId: string,
    data: CreateBloodRequestData,
  ): Promise<BloodRequestEntity>;

  abstract findById(bloodRequestId: string): Promise<BloodRequestEntity | null>;
  abstract findBloodRequestsByUserId(
    userId: string,
  ): Promise<BloodRequestEntity[] | null>;
  abstract update(
    bloodRequestId: string,
    data: Partial<UpdateBloodRequestData>,
  ): Promise<BloodRequestEntity>;
}
