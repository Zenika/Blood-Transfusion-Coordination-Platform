import { BloodRequestStatus } from '../enums/blood-request-status.enum';
import { UrgencyLevel } from '../enums/urgency-level.enum';

export type CreateBloodRequestData = {
  patientId: string;
  urgencyLevel: UrgencyLevel;
  status: BloodRequestStatus;
  medicalReason: string | null;
  quantity: number | null;
};
