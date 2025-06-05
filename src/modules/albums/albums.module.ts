import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './controllers';
import { AlbumsService } from './services';
import { AlbumsRepository, PrismaAlbumsRepository } from './repositories';
import { TracksModule } from '../tracks';
import { FavoritesModule } from '../favorites';

@Module({
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    { provide: AlbumsRepository, useClass: PrismaAlbumsRepository },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
