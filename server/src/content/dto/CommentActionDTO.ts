import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateCommentDTO {
  @IsNumber()
  @IsNotEmpty()
  contentId: number;

  @IsString()
  @IsNotEmpty()
  commentContent: string;
}

class GetContentCommentsDTO {
  @IsNumber()
  @IsNotEmpty()
  contentId: number;
}

export { CreateCommentDTO, GetContentCommentsDTO };
