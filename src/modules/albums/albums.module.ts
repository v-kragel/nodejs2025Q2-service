import { Module } from '@nestjs/common';
import { AlbumsController } from './controllers';
import { AlbumsService } from './services';
import { AlbumsRepository, InMemoryAlbumsRepository } from './repositories';
import { TracksModule } from '../tracks';

@Module({
  imports: [TracksModule],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: AlbumsRepository, useClass: InMemoryAlbumsRepository },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
