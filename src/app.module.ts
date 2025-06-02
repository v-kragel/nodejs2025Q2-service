import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users';
import { ArtistsModule } from './modules/artists';
import { TracksModule } from './modules/tracks';
import { AlbumsModule } from './modules/albums';
import { ConfigModule } from '@nestjs/config';
import { FavoritesModule } from './modules/favorites';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
