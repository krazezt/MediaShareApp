import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadImageDTO } from './dto';

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
      });
      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
