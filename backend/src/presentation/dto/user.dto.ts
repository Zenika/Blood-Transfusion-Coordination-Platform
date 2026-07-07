import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @MinLength(8)
  password!: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'First Name required' })
  firstName!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last Name required' })
  lastName!: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email adress' })
  email!: string;

  @ApiProperty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase , one lowercase ,one special character and one number',
    },
  )
  password!: string;

  @ApiProperty()
  @IsPhoneNumber('MA', { message: 'Invalid phone number' })
  phoneNumber!: string;
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword!: string;

  @ApiProperty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase , one lowercase ,one special character and one number',
    },
  )
  newPassword!: string;
}

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
