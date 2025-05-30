import { Injectable } from '@nestjs/common';
import { Artist } from '../models';
import { ArtistsRepository } from './artists.repository';

@Injectable()
export class InMemoryArtistsRepository implements ArtistsRepository {
  private artists: Artist[] = [];

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findById(id: string): Promise<Artist | null> {
    return this.artists.find((a) => a.id === id) || null;
  }

  async create(artist: Artist): Promise<Artist> {
    this.artists.push(artist);
    return artist;
  }

  async update(artist: Artist): Promise<void> {
    const index = this.artists.findIndex((a) => a.id === artist.id);

    if (index === -1) {
      throw new Error('Artist not found');
    }

    this.artists[index] = artist;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.artists.findIndex((a) => a.id === id);

    if (index === -1) return false;

    this.artists.splice(index, 1);

    return true;
  }
}
