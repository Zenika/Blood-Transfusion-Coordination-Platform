import { BloodType } from '../enums/blood-type.enum';
import { EligibilityStatus } from '../enums/eligibility-status.enum';

export type UpdateMedicalStatusData = {
  bloodType?: BloodType;
  dateOfBirth?: Date;
  lastDonationDate?: Date;
  weight?: number;
  height?: number;
  medicalNotes?: string;
  eligibilityStatus?: EligibilityStatus;
};
