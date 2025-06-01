import { Expose } from 'class-transformer';

export class TrackResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  duration: number;

  @Expose()
  artistId: string | null;

  @Expose()
  albumId: string | null;

  constructor(partial: Partial<TrackResponseDto>) {
    Object.assign(this, partial);
  }
}
