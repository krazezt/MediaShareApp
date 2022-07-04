import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { Request } from 'express';
import { UploadImageDTO } from './dto';
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
}
