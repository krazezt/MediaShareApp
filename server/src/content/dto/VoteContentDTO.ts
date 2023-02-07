import { VoteType } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

class VoteContentDTO {
  @IsNumber()
  @IsNotEmpty()
  contentId: number;

  @IsNotEmpty()
  type: VoteType;
}

export { VoteContentDTO };
