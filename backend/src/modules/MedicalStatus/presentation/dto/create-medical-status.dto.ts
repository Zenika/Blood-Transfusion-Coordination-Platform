import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BloodType } from 'src/shared/enums/blood-type.enum';
import { EligibilityStatus } from 'src/shared/enums/eligibility-status.enum';

export class CreateMedicalStatusDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty()
  @IsEnum(BloodType)
  @IsNotEmpty()
  bloodType!: BloodType;

  @ApiProperty()
  @IsEnum(EligibilityStatus)
  @IsNotEmpty()
  eligibilityStatus!: EligibilityStatus;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  dateOfBirth!: Date;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  lastDonationDate!: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  medicalNotes?: string;
}
