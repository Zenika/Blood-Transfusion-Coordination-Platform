import { BloodRequestStatus as BloodRequestStatusPrisma } from '@prisma/client';
import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';

export class BloodRequestStatusMapper {
  static toPrisma(type: BloodRequestStatus): BloodRequestStatusPrisma {
    return type;
  }
  static toDomain(type: BloodRequestStatusPrisma): BloodRequestStatus {
    return type as BloodRequestStatus;
  }
}
