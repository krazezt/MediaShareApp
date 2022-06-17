import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  new ConfigService().get('AUTH_GUARD_STRATEGY'),
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  // The token will be convert to the payload object,
  // Then pass into this function.
  // Here we can perform any validation that we want.
  // The return value will be in the @Req() object,
  // We can call this value by using: "@Req() req: Request" in the function that uses the @UseGuards() decorator
  // Note that "Request" is an interface from 'express'
  // - Krazezt -
  async validate(payload: { sub: number; email: string }) {
    const user = this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        name: true,
        email: true,
        avatarURL: true,
      },
    });

    return user;
  }
}
