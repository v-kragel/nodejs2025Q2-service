import { Module } from '@nestjs/common';
import { TracksController } from './controllers';
import { TracksService } from './services';
import { InMemoryTracksRepository, TracksRepository } from './repositories';

@Module({
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
