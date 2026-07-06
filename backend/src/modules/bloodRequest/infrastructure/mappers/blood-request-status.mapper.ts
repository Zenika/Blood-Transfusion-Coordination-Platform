import { BloodRequestStatus as BloodRequestStatusPrisma } from '@prisma/client';
import { BloodRequestStatusEnum } from 'src/shared/enums/blood-request-status.enum';

export class BloodRequestStatusMapper {
  static toPrisma(type: BloodRequestStatusEnum): BloodRequestStatusPrisma {
    return type as BloodRequestStatusPrisma;
  }
  static toDomain(type: BloodRequestStatusPrisma): BloodRequestStatusEnum {
    return type as BloodRequestStatusEnum;
  }
}
