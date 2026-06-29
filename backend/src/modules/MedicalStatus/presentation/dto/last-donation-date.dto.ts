import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class UpdatelastDonationDateDto {
  @ApiProperty()
  @IsDateString()
  date!: string;
}
