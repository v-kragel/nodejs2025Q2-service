import { Injectable } from '@nestjs/common';
import { Track } from '../models';
import { TracksRepository } from './tracks.repository';

@Injectable()
export class InMemoryTracksRepository implements TracksRepository {
  private tracks: Track[] = [];

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findById(id: string): Promise<Track | null> {
    return this.tracks.find((a) => a.id === id) || null;
  }

  async create(album: Track): Promise<Track> {
    this.tracks.push(album);
    return album;
  }

  async update(album: Track): Promise<void> {
    const index = this.tracks.findIndex((a) => a.id === album.id);

    if (index === -1) {
      throw new Error('Track not found');
    }

    this.tracks[index] = album;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.tracks.findIndex((a) => a.id === id);

    if (index === -1) return false;

    this.tracks.splice(index, 1);

    return true;
  }

  async findAllByArtistId(artistId: string): Promise<Track[]> {
    return this.tracks.filter((track) => track.artistId === artistId);
  }

  async findAllByAlbumId(albumId: string): Promise<Track[]> {
    return this.tracks.filter((track) => track.albumId === albumId);
  }

  async bulkUpdate(tracks: Track[]): Promise<void> {
    for (const updatedTrack of tracks) {
      const index = this.tracks.findIndex((a) => a.id === updatedTrack.id);
      if (index !== -1) {
        this.tracks[index] = updatedTrack;
      }
    }
  }
}
