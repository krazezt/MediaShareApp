import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDTO) {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        hash: true,
      },
    });

    // If there are no matched email, throw exception
    if (!user) throw new ForbiddenException('Email not found!');

    // Check password
    const checkPassword = await argon.verify(user.hash, dto.password);

    // If password is incorrect, throw an exception
    if (!checkPassword) throw new ForbiddenException('Incorrect password!');

    // If everything goes well, send back the token
    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDTO) {
    // Generate the hash password
    const hash = await argon.hash(dto.password);

    // Save the new user into the Database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          name: 'User Name',
          avatarURL: 'https://firebasestorage.googleapis.com/v0/b/mediashare-7dd4d.appspot.com/o/Avatars%2Fdefault.png?alt=media&token=7de5f2e3-c35d-4c71-b324-a9191653c8c3',
        },
        select: {
          id: true,
          email: true,
        },
      });

      // return the token
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already in used!');
        } else {
          throw new ForbiddenException('Sorry, something went wrong!');
        }
      }
    }
  }

  async signToken(userId: number, email: string): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    return {
      token: await this.jwt.signAsync(payload, {
        expiresIn: '30min',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
