import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { ChangeAvatarRequestDTO, GetProfileDTO } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // UseGuards will protect this route by the strategy which have the same "Key" that we pass into AuthGuard("<Key>").
  // For this case, I use the JwtStrategy class from auth/strategy/jwt.strategy.ts
  // And in both side, we have to assign the same "Key", so Nest Guard can detect what guard to use.
  // For clean code, I defined a new JwtGuard class, go to definition to see it clearer
  // - Krazezt -
  @UseGuards(JwtGuard)
  @Get('/me')
  getMe(@Req() req: Request) {
    return this.userService.getMe(req);
  }

  @UseGuards(JwtGuard)
  @Post('/change-avatar')
  @HttpCode(HttpStatus.OK)
  changeAvatar(@Req() req: Request, @Body() body: ChangeAvatarRequestDTO) {
    return this.userService.changeAvatar(req, body);
  }

  @UseGuards(JwtGuard)
  @Get('/get-profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Req() req: Request, @Body() body: GetProfileDTO) {
    return this.userService.getProfile(body);
  }
}
