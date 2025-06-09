import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users';
import { ArtistsModule } from './modules/artists';
import { TracksModule } from './modules/tracks';
import { AlbumsModule } from './modules/albums';
import { ConfigModule } from '@nestjs/config';
import { FavoritesModule } from './modules/favorites';
import { PrismaModule } from './prisma';
import { LoggingService } from './common';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggingService],
})
export class AppModule {}
