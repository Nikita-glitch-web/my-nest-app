/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, UseGuards, Patch } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log({
      email,
    });
    return user;
  }

  @Patch()
  editUser() {}
}
