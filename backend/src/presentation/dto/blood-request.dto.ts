import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BloodRequestStatusEnum } from 'src/shared/enums/blood-request-status.enum';
import { BloodType } from 'src/shared/enums/blood-type.enum';
import { UrgencyLevel } from 'src/shared/enums/urgency-level.enum';

export class createBloodRequestDto {
  @ApiProperty()
  @IsEnum(BloodType)
  bloodType!: BloodType;

  @ApiProperty()
  @IsEnum(UrgencyLevel)
  urgencyLevel!: UrgencyLevel;

  @ApiProperty()
  @IsEnum(BloodRequestStatusEnum)
  status!: BloodRequestStatusEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  medicalReason?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
