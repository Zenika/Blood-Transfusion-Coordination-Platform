import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

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
