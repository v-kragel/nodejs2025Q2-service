import { Injectable } from '@nestjs/common';
import { Artist } from '../models';

@Injectable()
export class InMemoryArtistsRepository {
  private artists: Artist[] = [];

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }
}
