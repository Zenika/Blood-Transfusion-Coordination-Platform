import { BloodType } from '../enums/blood-type.enum';
import { EligibilityStatus } from '../enums/eligibility-status.enum';

export type CreateMedicalStatusReponseType = {
  id: string;
  userId: string;
  bloodType: BloodType;
  eligibilityStatus: EligibilityStatus;
  dateOfBirth: Date | null;
  weight: number | null;
  height: number | null;
  lastDonationDate: Date | null;
  medicalNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
};
