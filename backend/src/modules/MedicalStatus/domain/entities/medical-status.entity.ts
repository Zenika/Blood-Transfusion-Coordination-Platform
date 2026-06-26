import { BloodType } from 'src/shared/enums/blood-type.enum';
import { EligibilityStatus } from 'src/shared/enums/eligibility-status.enum';

export class MedicalStatusEntity {
  id!: string;
  userId!: string;
  bloodType!: BloodType;
  eligibilityStatus!: EligibilityStatus;
  dateOfBirth!: Date;
  lastDonationDate!: Date | null;
  weight!: number;
  height!: number | null;
  medicalNotes!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
