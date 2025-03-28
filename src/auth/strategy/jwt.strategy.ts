/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService, // `readonly` за кращу безпеку
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<string>('JWT_SECRET', { infer: true }) ||
        'default_secret',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { hash, ...userWithoutHash } = user; // Видаляємо `hash`, не мутуючи оригінальний об'єкт
    return userWithoutHash;
  }
}
