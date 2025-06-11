import { Module } from '@nestjs/common';
import { AlbumsController } from './controllers';
import { AlbumsService } from './services';
import { AlbumsRepository, PrismaAlbumsRepository } from './repositories';
import { AuthModule } from '../auth';

@Module({
  imports: [AuthModule],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: AlbumsRepository, useClass: PrismaAlbumsRepository },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
