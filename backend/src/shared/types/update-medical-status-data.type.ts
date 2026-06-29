import { BloodType } from '../enums/blood-type.enum';
import { EligibilityStatus } from '../enums/eligibility-status.enum';
import { Gender } from '../enums/gender.enum';

export type UpdateMedicalStatusData = {
  bloodType?: BloodType;
  gender?: Gender;
  dateOfBirth?: Date;
  lastDonationDate?: Date;
  weight?: number;
  height?: number;
  medicalNotes?: string;
  eligibilityStatus?: EligibilityStatus;
};
