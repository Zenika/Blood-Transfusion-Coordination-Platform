import { BloodType } from '../enums/blood-type.enum';
import { Gender } from '../enums/gender.enum';

export type CreateMedicalStatusData = {
  userId: string;
  bloodType: BloodType;
  gender: Gender;
  dateOfBirth: Date;
  lastDonationDate?: Date | null;
  weight: number;
  height?: number | null;
  medicalNotes?: string | null;
};
