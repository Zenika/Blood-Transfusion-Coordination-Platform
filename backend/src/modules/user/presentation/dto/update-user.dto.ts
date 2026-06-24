import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Matches,
} from 'class-validator';
export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'First Name required' })
  @IsOptional()
  firstName!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last Name required' })
  @IsOptional()
  lastName!: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email adress' })
  @IsOptional()
  email!: string;

  @ApiProperty()
  @IsPhoneNumber('MA', { message: 'Invalid phone number' })
  @IsOptional()
  phoneNumber!: string;
}
