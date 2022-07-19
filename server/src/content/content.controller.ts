import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { Request } from 'express';
import { UploadImageDTO, UploadMusicDTO, UploadVideoDTO } from './dto';
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

  @Get('dashboard')
  async getDashboard() {
    return await this.contentService.getDashboard();
  }
}
