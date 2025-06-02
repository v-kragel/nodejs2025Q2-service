import { Album } from '@/modules/albums';
import { Artist } from '@/modules/artists';
import { Track } from '@/modules/tracks';
import { Expose } from 'class-transformer';

export class FavoritesResponseDto {
  @Expose()
  artists: Artist[];

  @Expose()
  albums: Album[];

  @Expose()
  tracks: Track[];

  constructor(partial: Partial<FavoritesResponseDto>) {
    Object.assign(this, partial);
  }
}
