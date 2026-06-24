import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';
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
