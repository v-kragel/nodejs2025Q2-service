import { Injectable } from '@nestjs/common';
import { Track } from '../models';

@Injectable()
export class InMemoryTracksRepository {
  private tracks: Track[] = [];

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }
}
