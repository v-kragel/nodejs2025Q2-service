import { Injectable } from '@nestjs/common';
import { Artist } from '../models';
import { InMemoryArtistsRepository } from '../repositories';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepo: InMemoryArtistsRepository) {}

  findAll(): Promise<Artist[]> {
    return this.artistsRepo.findAll();
  }
}
