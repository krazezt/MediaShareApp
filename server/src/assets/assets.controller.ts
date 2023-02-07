import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('assets')
export class AssetsController {
  @Get('video/:id')
  getFile(@Param('id') id: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), `public/video/${id}`));
    return new StreamableFile(file);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/video',
        filename(req, file, callback) {
          const name = `${file.originalname.replace(
            /\.[^/.]+$/,
            '',
          )}-${Date.now()}`;
          const fileExtName = extname(file.originalname);
          callback(null, `${name}${fileExtName}`);
        },
      }),
      limits: {
        fieldSize: 25 * 1024 * 1024,
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: file.filename };
  }
}
