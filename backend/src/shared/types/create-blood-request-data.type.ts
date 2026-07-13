import { BloodRequestStatusEnum } from '../enums/blood-request-status.enum';
import { BloodType } from '../enums/blood-type.enum';
import { UrgencyLevel } from '../enums/urgency-level.enum';

export type CreateBloodRequestData = {
  patientId: string;
  bloodType: BloodType;
  urgencyLevel: UrgencyLevel;
  status: BloodRequestStatusEnum;
  medicalReason: string | null;
  quantity: number | null;
};
