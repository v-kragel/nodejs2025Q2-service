import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './controllers';
import { FavoritesService } from './services';
import {
  InMemoryFavoritesRepository,
  FavoritesRepository,
} from './repositories';
import { ArtistsModule } from '../artists';
import { AlbumsModule } from '../albums';
import { TracksModule } from '../tracks';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: FavoritesRepository,
      useClass: InMemoryFavoritesRepository,
    },
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
