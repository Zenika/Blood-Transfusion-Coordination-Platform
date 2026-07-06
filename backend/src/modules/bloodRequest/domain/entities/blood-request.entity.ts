import { BloodRequestStatusEnum } from 'src/shared/enums/blood-request-status.enum';
import { BloodType } from 'src/shared/enums/blood-type.enum';
import { UrgencyLevel } from 'src/shared/enums/urgency-level.enum';

export class BloodRequestEntity {
  id!: string;
  patientId!: string;
  bloodType!: BloodType;
  urgencyLevel!: UrgencyLevel;
  status!: BloodRequestStatusEnum;
  medicalReason!: string | null;
  quantity!: number | null;
  createdAt!: Date;
  updatedAt!: Date;
}
