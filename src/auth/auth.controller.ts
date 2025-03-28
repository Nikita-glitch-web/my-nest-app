/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthServices } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthServices) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  singup(@Body() dto: AuthDto) {
    return this.authServices.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authServices.signin(dto);
  }
}
