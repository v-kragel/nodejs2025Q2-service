import { Injectable } from '@nestjs/common';
import { Track } from '../models';
import { InMemoryTracksRepository } from '../repositories';

@Injectable()
export class TracksService {
  constructor(private readonly tracksRepo: InMemoryTracksRepository) {}

  findAll(): Promise<Track[]> {
    return this.tracksRepo.findAll();
  }
}
