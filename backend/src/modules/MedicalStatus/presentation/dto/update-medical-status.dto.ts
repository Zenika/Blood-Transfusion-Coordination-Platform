import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional()
  @IsEnum(BloodType)
  bloodType!: BloodType;

  @IsOptional()
  @ApiPropertyOptional()
  @IsEnum(Gender)
  gender!: Gender;

  @IsOptional()
  @ApiPropertyOptional()
  @IsDateString()
  dateOfBirth!: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsDateString()
  lastDonationDate?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  weight!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  medicalNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(EligibilityStatus)
  eligibilityStatus!: EligibilityStatus;
}
