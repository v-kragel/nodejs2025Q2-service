import { Module } from '@nestjs/common';
import { AlbumsController } from './controllers';
import { AlbumsService } from './services';
import { AlbumsRepository, PrismaAlbumsRepository } from './repositories';

@Module({
  imports: [],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: AlbumsRepository, useClass: PrismaAlbumsRepository },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
