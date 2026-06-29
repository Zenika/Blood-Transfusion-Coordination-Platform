import { BloodType } from 'src/shared/enums/blood-type.enum';
import { EligibilityStatus } from 'src/shared/enums/eligibility-status.enum';
import { Gender } from 'src/shared/enums/gender.enum';

export class MedicalStatusEntity {
  id!: string;
  userId!: string;
  gender!: Gender;
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
