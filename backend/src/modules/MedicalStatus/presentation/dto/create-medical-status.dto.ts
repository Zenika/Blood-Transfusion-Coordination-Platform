import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BloodType } from 'src/shared/enums/blood-type.enum';
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  lastDonationDate?: string;

  @ApiProperty()
  @IsNumber()
  weight!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  medicalNotes?: string;
}
