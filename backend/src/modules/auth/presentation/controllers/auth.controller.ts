import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() body: any) {
    return {
      message: 'test endpoint',
      data: body,
    };
  }
}
