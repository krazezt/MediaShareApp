import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor() {}
  // UseGuards will protect this route by the strategy which have the same "Key" that we pass into AuthGuard("<Key>").
  // For this case, I use the JwtStrategy class from auth/strategy/jwt.strategy.ts
  // And in both side, we have to assign the same "Key", so Nest Guard can detect what guard to use.
  // For clean code, I defined a new JwtGuard class, go to definition to see it clearer
  // - Krazezt -
  @UseGuards(JwtGuard)
  @Get('/me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
