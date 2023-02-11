import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { Request } from 'express';
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
import { User } from '@prisma/client';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @UseGuards(JwtGuard)
  @Post('upload-image')
  async uploadImage(@Req() req: Request, @Body() body: UploadImageDTO) {
    const res = await this.contentService.uploadImage(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @UseGuards(JwtGuard)
  @Post('upload-video')
  async uploadVideo(@Req() req: Request, @Body() body: UploadVideoDTO) {
    const res = await this.contentService.uploadVideo(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @UseGuards(JwtGuard)
  @Post('upload-music')
  async uploadMusic(@Req() req: Request, @Body() body: UploadMusicDTO) {
    const res = await this.contentService.uploadMusic(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post('vote-content')
  async voteContent(@Req() req: Request, @Body() body: VoteContentDTO) {
    const res = await this.contentService.voteContent(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post('unvote-content')
  async unvoteContent(@Req() req: Request, @Body() body: UnVoteContentDTO) {
    const res = await this.contentService.unvoteContent(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @UseGuards(JwtGuard)
  @Post('create-report')
  async createReport(@Req() req: Request, @Body() body: CreateReportDTO) {
    const res = await this.contentService.createReport(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post('update-report')
  async updateReport(@Req() req: Request, @Body() body: UpdateReportDTO) {
    const res = await this.contentService.updateReport(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @UseGuards(JwtGuard)
  @Post('create-collection')
  async createCollection(
    @Req() req: Request,
    @Body() body: CreateCollectionDTO,
  ) {
    const res = await this.contentService.createCollection(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post('join-collection')
  async joinCollection(@Req() req: Request, @Body() body: JoinCollectionDTO) {
    const res = await this.contentService.joinCollection(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post('add-post-to-collection')
  async addPostToCollection(
    @Req() req: Request,
    @Body() body: AddPostToCollectionDTO,
  ) {
    const res = await this.contentService.addPostToCollection(body);
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('get-collection-info')
  async getCollectionInfo(
    @Req() req: Request,
    @Body() body: GetCollectionInfoDTO,
  ) {
    const res = await this.contentService.getCollectionInfo(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @Post('create-comment')
  async createComment(@Req() req: Request, @Body() body: CreateCommentDTO) {
    const res = await this.contentService.createComment(
      (req.user as User).id,
      body,
    );
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post('get-content-comments')
  async getContentComments(
    @Req() req: Request,
    @Body() body: GetContentCommentsDTO,
  ) {
    const res = await this.contentService.getContentComments(body);
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('dashboard')
  async getDashboard(@Req() req: Request) {
    return await this.contentService.getDashboard((req.user as User).id);
  }
}
