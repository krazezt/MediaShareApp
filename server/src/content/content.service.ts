import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddPostToCollectionDTO,
  CreateCollectionDTO,
  CreateCommentDTO,
  CreateReportDTO,
  GetCollectionInfoDTO,
  GetContentCommentsDTO,
  JoinCollectionDTO,
  UnVoteContentDTO,
  UpdateReportDTO,
  UploadImageDTO,
  UploadMusicDTO,
  UploadVideoDTO,
  VoteContentDTO,
} from './dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

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
        throw new ForbiddenException(error.message);
      } else {
        throw new BadRequestException();
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
      } else {
        throw new BadRequestException();
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
      } else {
        throw new BadRequestException();
      }
    }
  }

  async voteContent(userId: number, dto: VoteContentDTO) {
    try {
      const res = await this.prisma.vote.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          content: {
            connect: {
              id: dto.contentId,
            },
          },
          type: dto.type,
        },
      });

      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      } else {
        throw new BadRequestException();
      }
    }
  }

  async unvoteContent(reqUserId: number, dto: UnVoteContentDTO) {
    try {
      const res = await this.prisma.vote.delete({
        where: {
          userId_contentId: {
            userId: reqUserId,
            contentId: dto.contentId,
          },
        },
      });

      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      } else {
        throw new BadRequestException();
      }
    }
  }

  async createReport(userId: number, dto: CreateReportDTO) {
    try {
      const res = await this.prisma.report.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          content: {
            connect: {
              id: dto.contentId,
            },
          },
          reason: dto.reason,
        },
      });

      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      } else {
        throw new BadRequestException();
      }
    }
  }

  async updateReport(userId: number, dto: UpdateReportDTO) {
    try {
      const res = await this.prisma.report.update({
        data: {
          status: dto.status,
        },
        where: {
          id: dto.reportId,
        },
      });

      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      } else {
        throw new BadRequestException();
      }
    }
  }

  async createCollection(authorId: number, dto: CreateCollectionDTO) {
    const characters = this.config.get('PRIVATE_KEY_CHARACTERS');
    const length = parseInt(this.config.get('PRIVATE_KEY_LENGTH'));

    let privateKeyPosfix = '';
    for (let i = 0; i < length; i++) {
      privateKeyPosfix += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    try {
      // Create new collection
      const newCollection = await this.prisma.collection.create({
        data: {
          title: dto.title,
          content: {
            create: {
              type: 'COLLECTION',
              authorId: authorId,
              views: 0,
              shareState: dto.shareState,
            },
          },
        },
        select: {
          id: true,
          title: true,
          content: {
            select: {
              author: {
                select: {
                  id: true,
                  name: true,
                  avatarURL: true,
                },
              },
              privateKey: true,
            },
          },
        },
      });

      const keyHolderContent = await this.prisma.content.update({
        where: {
          id: newCollection.id,
        },
        data: {
          privateKey: privateKeyPosfix + newCollection.id,
        },
      });

      newCollection.content.privateKey = keyHolderContent.privateKey;

      // Add author to accessible list
      await this.prisma.accessible.create({
        data: {
          user: {
            connect: {
              id: newCollection.content.author.id,
            },
          },
          content: {
            connect: {
              id: newCollection.id,
            },
          },
        },
      });

      return newCollection;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(error.message);
      } else {
        throw new BadRequestException();
      }
    }
  }

  async joinCollection(userId: number, dto: JoinCollectionDTO) {
    try {
      const reqCollection = await this.prisma.collection.findUnique({
        where: {
          id: dto.collectionId,
        },
        select: {
          title: true,
          content: {
            select: {
              author: {
                select: {
                  name: true,
                  avatarURL: true,
                },
              },
              privateKey: true,
              shareState: true,
            },
          },
        },
      });

      if (
        reqCollection.content.privateKey !== dto.privateKey &&
        reqCollection.content.shareState !== 'PUBLIC'
      )
        throw new ForbiddenException('Incorrect private key!');

      if (reqCollection.content.shareState === 'PRIVATE')
        throw new ForbiddenException('This collection is private!');

      await this.prisma.accessible.create({
        data: {
          content: {
            connect: {
              id: dto.collectionId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return reqCollection;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new BadRequestException(
            "You're already joined this collection!",
          );
        throw new ForbiddenException(error.message);
      } else if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new BadRequestException();
      }
    }
  }

  async addPostToCollection(dto: AddPostToCollectionDTO) {
    try {
      const res = await this.prisma.postInCollection.create({
        data: {
          collection: {
            connect: {
              id: dto.collectionId,
            },
          },
          post: {
            connect: {
              id: dto.postId,
            },
          },
        },
      });

      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new BadRequestException('Post already in the collection!');
        throw new ForbiddenException(error.message);
      } else if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new BadRequestException();
      }
    }
  }

  async getCollectionInfo(reqUserId: number, dto: GetCollectionInfoDTO) {
    try {
      const checkPermission = await this.prisma.accessible.findUnique({
        where: {
          userId_contentId: {
            contentId: dto.collectionId,
            userId: reqUserId,
          },
        },
        select: {
          content: {
            select: {
              author: {
                select: {
                  id: true,
                  avatarURL: true,
                  name: true,
                },
              },
              collection: {
                select: {
                  id: true,
                  title: true,
                  createdAt: true,
                  posts: {
                    select: {
                      post: {
                        select: {
                          caption: true,
                          id: true,
                          type: true,
                          mediaURL: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!checkPermission)
        throw new ForbiddenException(
          "This user does'nt have permission to access this content",
        );

      return checkPermission;
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

  async createComment(reqUserId: number, dto: CreateCommentDTO) {
    try {
      const newComment = await this.prisma.comment.create({
        data: {
          user: {
            connect: {
              id: reqUserId,
            },
          },
          content: {
            connect: {
              id: dto.contentId,
            },
          },
          commentContent: dto.commentContent,
        },
      });

      return newComment;
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

  async getContentComments(dto: GetContentCommentsDTO) {
    try {
      const res = await this.prisma.comment.findMany({
        where: {
          contentId: dto.contentId,
        },
        select: {
          id: true,
          commentContent: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatarURL: true,
            },
          },
        },
      });

      return res;
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

  async getDashboard(reqUserId: number) {
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
            votes: {
              where: {
                userId: reqUserId,
              }
            }
          },
        },
      },
    });
    return res;
  }
}
