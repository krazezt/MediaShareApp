import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ChangeAvatarRequestDTO {
  @IsUrl()
  @IsNotEmpty()
  avatarURL: string;
}