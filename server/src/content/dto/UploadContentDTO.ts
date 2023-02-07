import { Accessibility } from '@prisma/client';
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

class UploadImageDTO {
  @IsString()
  @IsNotEmpty()
  caption: string;

  @IsUrl()
  @IsNotEmpty()
  mediaURL: string;

  @IsArray()
  @IsNotEmpty()
  categories: string[];

  shareState: Accessibility;
}

class UploadVideoDTO {
  @IsString()
  @IsNotEmpty()
  caption: string;

  // For now, video is being saved in server, mediaURL is just the fileName, not URL
  // @IsUrl()
  @IsNotEmpty()
  mediaURL: string;

  @IsArray()
  @IsNotEmpty()
  categories: string[];

  shareState: Accessibility;
}

class UploadMusicDTO {
  @IsString()
  @IsNotEmpty()
  caption: string;

  @IsUrl()
  @IsNotEmpty()
  mediaURL: string;

  @IsArray()
  @IsNotEmpty()
  categories: string[];

  shareState: Accessibility;
}

export { UploadImageDTO, UploadVideoDTO, UploadMusicDTO };
