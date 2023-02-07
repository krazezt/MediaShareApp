import { Accessibility } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateCollectionDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  shareState: Accessibility;
}

class JoinCollectionDTO {
  @IsNumber()
  @IsNotEmpty()
  collectionId: number;

  @IsString()
  @IsNotEmpty()
  privateKey: string;
}

class AddPostToCollectionDTO {
  @IsNumber()
  @IsNotEmpty()
  collectionId: number;

  @IsNumber()
  @IsNotEmpty()
  postId: number;
}

class GetCollectionInfoDTO {
  @IsNumber()
  @IsNotEmpty()
  collectionId: number;
}

export { CreateCollectionDTO, JoinCollectionDTO, AddPostToCollectionDTO, GetCollectionInfoDTO };
