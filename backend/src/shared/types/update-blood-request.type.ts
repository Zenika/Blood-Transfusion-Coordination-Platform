import { UrgencyLevel } from '../enums/urgency-level.enum';

export type UpdateBloodRequestData = {
  urgencyLevel?: UrgencyLevel;
  medicalReason?: string;
  quantity?: number;
};
