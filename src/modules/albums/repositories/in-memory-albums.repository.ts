import { Injectable } from '@nestjs/common';
import { Album } from '../models';
import { AlbumsRepository } from './albums.repository';

@Injectable()
export class InMemoryAlbumsRepository implements AlbumsRepository {
  private albums: Album[] = [];

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findById(id: string): Promise<Album | null> {
    return this.albums.find((a) => a.id === id) || null;
  }

  async create(album: Album): Promise<Album> {
    this.albums.push(album);
    return album;
  }

  async update(album: Album): Promise<void> {
    const index = this.albums.findIndex((a) => a.id === album.id);

    if (index === -1) {
      throw new Error('Album not found');
    }

    this.albums[index] = album;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.albums.findIndex((a) => a.id === id);

    if (index === -1) return false;

    this.albums.splice(index, 1);

    return true;
  }

  async findAllByArtistId(artistId: string): Promise<Album[]> {
    return this.albums.filter((album) => album.artistId === artistId);
  }

  async bulkUpdate(albums: Album[]): Promise<void> {
    for (const updatedAlbum of albums) {
      const index = this.albums.findIndex((a) => a.id === updatedAlbum.id);
      if (index !== -1) {
        this.albums[index] = updatedAlbum;
      }
    }
  }
}
