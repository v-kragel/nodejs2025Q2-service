import { Module } from '@nestjs/common';
import { TracksController } from './controllers';
import { TracksService } from './services';
import { PrismaTracksRepository, TracksRepository } from './repositories';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: TracksRepository,
      useClass: PrismaTracksRepository,
    },
  ],
  exports: [TracksService],
})
export class TracksModule {}
