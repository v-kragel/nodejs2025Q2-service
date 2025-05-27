import { Module } from '@nestjs/common';
import { TracksController } from './controllers';
import { TracksService } from './services';
import { InMemoryTracksRepository } from './repositories';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryTracksRepository],
  exports: [TracksService],
})
export class TracksModule {}
