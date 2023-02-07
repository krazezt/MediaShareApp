import { IsNotEmpty, IsNumber } from 'class-validator';

class GetProfileDTO {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export { GetProfileDTO };
