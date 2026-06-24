import { BloodType } from '../enums/blood-type.enum';
import { EligibilityStatus } from '../enums/eligibility-status.enum';

export type CreateMedicalStatusData = {
  userId: string;
  bloodType: BloodType;
  eligibilityStatus: EligibilityStatus;
  dateOfBirth: Date;
  weight?: number;
  height?: number;
  lastDonationDate: Date;
  medicalNotes?: string;
};
