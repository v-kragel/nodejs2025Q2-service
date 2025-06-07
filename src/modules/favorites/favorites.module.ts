import { Module } from '@nestjs/common';
import { FavoritesController } from './controllers';
import { FavoritesService } from './services';
import { PrismaFavoritesRepository, FavoritesRepository } from './repositories';
import { ArtistsModule } from '../artists';
import { AlbumsModule } from '../albums';
import { TracksModule } from '../tracks';

@Module({
  imports: [ArtistsModule, AlbumsModule, TracksModule],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: FavoritesRepository,
      useClass: PrismaFavoritesRepository,
    },
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
