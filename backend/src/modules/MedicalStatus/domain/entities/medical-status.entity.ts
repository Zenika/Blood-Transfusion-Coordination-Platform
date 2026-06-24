import { BloodType } from 'src/shared/enums/blood-type.enum';
import { EligibilityStatus } from 'src/shared/enums/eligibility-status.enum';

export class MedicalStatusEntity {
  id!: string;
  userId!: string;
  bloodType!: BloodType;
  eligibilityStatus!: EligibilityStatus;
  dateOfBirth!: Date;
  weight?: number;
  height?: number;
  lastDonationDate?: Date;
  medicalNotes?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
