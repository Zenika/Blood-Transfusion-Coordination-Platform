import { BloodType } from '../enums/blood-type.enum';
import { EligibilityStatus } from '../enums/eligibility-status.enum';

export type CreateMedicalStatusData = {
  bloodType: BloodType;
  dateOfBirth: Date;
  lastDonationDate: Date | null;
  weight: number;
  height: number | null;
  medicalNotes: string | null;
  eligibilityStatus: EligibilityStatus;
};
