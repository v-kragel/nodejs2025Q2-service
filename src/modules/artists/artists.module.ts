import { Module } from '@nestjs/common';
import { ArtistsController } from './controllers';
import { ArtistsService } from './services';
import { InMemoryArtistsRepository } from './repositories';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryArtistsRepository],
  exports: [ArtistsService],
})
export class ArtistsModule {}
