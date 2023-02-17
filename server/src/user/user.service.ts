import {
  BadRequestException,
  Body,
  ForbiddenException,
  Injectable,
  Req,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeAvatarRequestDTO, GetProfileDTO } from './dto';
import { Request } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(req: Request) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: (req.user as User).id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatarURL: true,
          accessibleTo: {
            where: {
              content: {
                OR: [
                  {
                    collection: {
                      parentId: null,
                    },
                  },
                  {
                    type: 'POST',
                  },
                ],
              },
            },
            select: {
              content: {
                select: {
                  votes: {
                    where: {
                      userId: (req.user as User).id,
                    },
                    select: {
                      userId: true,
                      contentId: true,
                      createdAt: true,
                      type: true,
                    },
                  },
                  id: true,
                  author: {
                    select: {
                      id: true,
                      avatarURL: true,
                      name: true,
                    },
                  },
                  collection: {
                    select: {
                      title: true,
                    },
                  },
                  post: {
                    select: {
                      caption: true,
                      type: true,
                      mediaURL: true,
                    },
                  },
                  categories: true,
                  type: true,
                },
              },
            },
          },
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      } else if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new BadRequestException();
      }
    }
  }

  async changeAvatar(
    @Req() req: Request,
    @Body() body: ChangeAvatarRequestDTO,
  ) {
    let result: User;
    try {
      result = await this.prisma.user.update({
        where: { email: (req.user as User).email as string },
        data: {
          avatarURL: body.avatarURL,
        },
      });
      return { name: result.name, avatarURL: result.avatarURL };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      } else if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new BadRequestException();
      }
    }
  }

  async getProfile(dto: GetProfileDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: dto.userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatarURL: true,
          accessibleTo: {
            where: {
              content: {
                OR: [
                  {
                    collection: {
                      parentId: null,
                      content: {
                        shareState: "PUBLIC"
                      }
                    },
                  },
                  {
                    type: 'POST',
                  },
                ],
              },
            },
            select: {
              content: {
                select: {
                  votes: {
                    where: {
                      userId: dto.userId,
                    },
                    select: {
                      userId: true,
                      contentId: true,
                      createdAt: true,
                      type: true,
                    },
                  },
                  id: true,
                  author: {
                    select: {
                      id: true,
                      avatarURL: true,
                      name: true,
                    },
                  },
                  collection: {
                    select: {
                      title: true,
                    },
                  },
                  post: {
                    select: {
                      caption: true,
                      type: true,
                      mediaURL: true,
                    },
                  },
                  categories: true,
                  type: true,
                },
              },
            },
          },
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      } else if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new BadRequestException();
      }
    }
  }
}
