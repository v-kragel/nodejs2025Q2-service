import { forwardRef, Module } from '@nestjs/common';
import { ArtistsController } from './controllers';
import { ArtistsService } from './services';
import { ArtistsRepository, PrismaArtistsRepository } from './repositories';
import { AlbumsModule } from '../albums';
import { TracksModule } from '../tracks';
import { FavoritesModule } from '../favorites';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: ArtistsRepository,
      useClass: PrismaArtistsRepository,
    },
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
