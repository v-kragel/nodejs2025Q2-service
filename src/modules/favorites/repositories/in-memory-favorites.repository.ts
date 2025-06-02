import { Injectable } from '@nestjs/common';
import { Favorites } from '../models';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class InMemoryFavoritesRepository implements FavoritesRepository {
  private readonly artistIds = new Set<string>();
  private readonly albumIds = new Set<string>();
  private readonly trackIds = new Set<string>();

  async getAll(): Promise<Favorites> {
    return {
      artists: Array.from(this.artistIds),
      albums: Array.from(this.albumIds),
      tracks: Array.from(this.trackIds),
    };
  }

  async addArtist(artistId: string): Promise<void> {
    this.artistIds.add(artistId);
  }
  async removeArtist(artistId: string): Promise<void> {
    this.artistIds.delete(artistId);
  }
  async isArtistFavorite(artistId: string): Promise<boolean> {
    return this.artistIds.has(artistId);
  }

  async addAlbum(albumId: string): Promise<void> {
    this.albumIds.add(albumId);
  }
  async removeAlbum(albumId: string): Promise<void> {
    this.albumIds.delete(albumId);
  }
  async isAlbumFavorite(albumId: string): Promise<boolean> {
    return this.albumIds.has(albumId);
  }

  async addTrack(trackId: string): Promise<void> {
    this.trackIds.add(trackId);
  }
  async removeTrack(trackId: string): Promise<void> {
    this.trackIds.delete(trackId);
  }
  async isTrackFavorite(trackId: string): Promise<boolean> {
    return this.trackIds.has(trackId);
  }
}
