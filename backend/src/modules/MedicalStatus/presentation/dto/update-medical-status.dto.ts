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

export class UpdateMedicalStatusDto {
  @IsOptional()
  @ApiProperty()
  @IsEnum(BloodType)
  bloodType!: BloodType;

  @IsOptional()
  @ApiProperty()
  @IsEnum(Gender)
  gender!: Gender;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  dateOfBirth!: string;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  lastDonationDate?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
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
