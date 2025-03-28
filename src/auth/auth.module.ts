import { Module } from '@nestjs/common';
import { AuthServices } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthServices, JwtStrategy],
})
export class AuthModule {}
