import { forwardRef, Module } from '@nestjs/common';
import { TracksController } from './controllers';
import { TracksService } from './services';
import { InMemoryTracksRepository, TracksRepository } from './repositories';
import { FavoritesModule } from '../favorites';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: TracksRepository,
      useClass: InMemoryTracksRepository,
    },
  ],
  exports: [TracksService],
})
export class TracksModule {}
