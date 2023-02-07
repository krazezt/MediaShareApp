import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';
import { AssetsController } from './assets/assets.controller';
import { AssetsModule } from './assets/assets.module';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: 'public',
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    ContentModule,
    AssetsModule,
  ],
  controllers: [AppController, AssetsController],
  providers: [AppService],
})
export class AppModule {}
