import { Injectable } from '@nestjs/common';
import { Album } from '../models';
import { InMemoryAlbumsRepository } from '../repositories';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsRepo: InMemoryAlbumsRepository) {}

  findAll(): Promise<Album[]> {
    return this.albumsRepo.findAll();
  }
}
