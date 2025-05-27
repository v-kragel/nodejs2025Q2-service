import { Module } from '@nestjs/common';
import { AlbumsController } from './controllers';
import { AlbumsService } from './services';
import { InMemoryAlbumsRepository } from './repositories';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryAlbumsRepository],
  exports: [AlbumsService],
})
export class AlbumsModule {}
