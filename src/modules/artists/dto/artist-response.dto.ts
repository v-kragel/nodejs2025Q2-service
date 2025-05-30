import { Expose } from 'class-transformer';

export class ArtistResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  grammy: boolean;

  constructor(partial: Partial<ArtistResponseDto>) {
    Object.assign(this, partial);
  }
}
