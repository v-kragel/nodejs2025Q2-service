import { Module } from '@nestjs/common';
import { ArtistsController } from './controllers';
import { ArtistsService } from './services';
import { ArtistsRepository, PrismaArtistsRepository } from './repositories';

@Module({
  imports: [],
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
