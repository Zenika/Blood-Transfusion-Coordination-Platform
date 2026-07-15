import { BloodType } from '../enums/blood-type.enum';
import { UrgencyLevel } from '../enums/urgency-level.enum';
import { BloodRequestStatus } from '../enums/blood-request-status.enum';

export type UpdateBloodRequestData = {
  bloodType?: BloodType;
  urgencyLevel?: UrgencyLevel;
  status?: BloodRequestStatus;
  medicalReason?: string;
  quantity?: number;
};
