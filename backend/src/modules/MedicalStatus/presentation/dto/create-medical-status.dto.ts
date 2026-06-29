import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BloodType } from 'src/shared/enums/blood-type.enum';
import { EligibilityStatus } from 'src/shared/enums/eligibility-status.enum';
import { Gender } from 'src/shared/enums/gender.enum';

export class CreateMedicalStatusDto {
  @ApiProperty()
  @IsEnum(BloodType)
  bloodType!: BloodType;

  @ApiProperty()
  @IsEnum(Gender)
  gender!: Gender;

  @ApiProperty()
  @IsDateString()
  dateOfBirth!: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  lastDonationDate?: string;

  @ApiProperty()
  @IsNumber()
  weight!: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  medicalNotes?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EligibilityStatus)
  eligibilityStatus!: EligibilityStatus;
}
