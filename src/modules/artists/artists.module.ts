import { Module } from '@nestjs/common';
import { ArtistsController } from './controllers';
import { ArtistsService } from './services';
import { ArtistsRepository, InMemoryArtistsRepository } from './repositories';
import { AlbumsModule } from '../albums';
import { TracksModule } from '../tracks';

@Module({
  imports: [AlbumsModule, TracksModule],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: ArtistsRepository,
      useClass: InMemoryArtistsRepository,
    },
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
