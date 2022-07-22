import { Accessibility } from '@prisma/client';
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UploadImageDTO {
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

export class UploadVideoDTO {
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

export class UploadMusicDTO {
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
