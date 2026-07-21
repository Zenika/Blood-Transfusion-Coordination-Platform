import { CreateBloodRequestData } from 'src/shared/types/create-blood-request-data.type';
import { BloodRequestEntity } from '../entities/blood-request.entity';
import { UpdateBloodRequestData } from 'src/shared/types/update-blood-request.type';
import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';

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
  abstract updateBloodRequestStatus(
    bloodRequestId: string,
    status: BloodRequestStatus,
  ): Promise<BloodRequestEntity>;
  abstract findActiveBloodRequestsByUserId(
    userId: string,
  ): Promise<BloodRequestEntity[]>;
}
