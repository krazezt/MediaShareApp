import { Body, ForbiddenException, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeAvatarRequestDTO } from './dto/ChangeAvatarRequestDTO';
import { Request } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async changeAvatar(
    @Req() req: Request,
    @Body() body: ChangeAvatarRequestDTO,
  ) {
    let result: User;
    try {
      result = await this.prisma.user.update({
        where: { email: (req.user as any).email as string },
        data: {
          avatarURL: body.avatarURL,
        },
      });
      return { name: result.name, avatarURL: result.avatarURL };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Known Prisma Error!');
      }
    }
  }
}
