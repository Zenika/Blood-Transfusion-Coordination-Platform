import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';
import { BloodType } from 'src/shared/enums/blood-type.enum';
import { UrgencyLevel } from 'src/shared/enums/urgency-level.enum';

export class createBloodRequestDto {
  @ApiProperty()
  @IsEnum(UrgencyLevel)
  urgencyLevel!: UrgencyLevel;

  @ApiProperty()
  @IsString()
  @IsOptional()
  medicalReason?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity?: number;
}

export class UpdateBloodRequestDto {
  @ApiProperty()
  @IsEnum(BloodType)
  @IsOptional()
  bloodType!: BloodType;

  @ApiProperty()
  @IsEnum(UrgencyLevel)
  @IsOptional()
  urgencyLevel!: UrgencyLevel;

  @ApiProperty()
  @IsEnum(BloodRequestStatus)
  @IsOptional()
  status!: BloodRequestStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  medicalReason?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity?: number;
}

export class UpdateBloodRequestStatusDto {
  @ApiProperty()
  @IsEnum(BloodRequestStatus)
  status!: BloodRequestStatus;
}
