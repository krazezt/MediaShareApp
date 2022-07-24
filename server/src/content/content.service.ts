import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadImageDTO, UploadMusicDTO, UploadVideoDTO } from './dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async uploadImage(authorId: number, dto: UploadImageDTO) {
    try {
      const res = await this.prisma.post.create({
        data: {
          caption: dto.caption,
          type: PostType.IMAGE,
          mediaURL: dto.mediaURL,
          content: {
            create: {
              type: 'POST',
              authorId: authorId,
              views: 0,
              shareState: dto.shareState,
              categories: {
                connect: dto.categories.map(
                  (item) => <{ name: string }>{ name: item },
                ),
              },
            },
          },
        },
        include: {
          content: {
            select: {
              categories: true,
              author: {
                select: {
                  name: true,
                  avatarURL: true,
                },
              },
            },
          },
        },
      });

      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error.message);
        throw new ForbiddenException(error.message);
      }
    }
  }

  async uploadVideo(authorId: number, dto: UploadVideoDTO) {
    try {
      const res = await this.prisma.post.create({
        data: {
          caption: dto.caption,
          type: PostType.VIDEO,
          mediaURL: dto.mediaURL,
          content: {
            create: {
              type: 'POST',
              authorId: authorId,
              views: 0,
              shareState: dto.shareState,
              categories: {
                connect: dto.categories.map(
                  (item) => <{ name: string }>{ name: item },
                ),
              },
            },
          },
        },
        include: {
          content: {
            select: {
              categories: true,
              author: {
                select: {
                  name: true,
                  avatarURL: true,
                },
              },
            },
          },
        },
      });

      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  async uploadMusic(authorId: number, dto: UploadMusicDTO) {
    try {
      const res = await this.prisma.post.create({
        data: {
          caption: dto.caption,
          type: PostType.MUSIC,
          mediaURL: dto.mediaURL,
          content: {
            create: {
              type: 'POST',
              authorId: authorId,
              views: 0,
              shareState: dto.shareState,
              categories: {
                connect: dto.categories.map(
                  (item) => <{ name: string }>{ name: item },
                ),
              },
            },
          },
        },
        include: {
          content: {
            select: {
              categories: true,
              author: {
                select: {
                  name: true,
                  avatarURL: true,
                },
              },
            },
          },
        },
      });

      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  async getDashboard() {
    const res = await this.prisma.post.findMany({
      include: {
        content: {
          select: {
            categories: true,
            author: {
              select: {
                avatarURL: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return res;
  }
}
