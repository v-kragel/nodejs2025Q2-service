import { Injectable } from '@nestjs/common';
import { Favorites } from '../models';
import { FavoritesRepository } from './favorites.repository';
import { PrismaService } from '@/prisma';

@Injectable()
export class PrismaFavoritesRepository implements FavoritesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Favorites> {
    const [artists, albums, tracks] = await Promise.all([
      this.prisma.favoriteArtist.findMany({ include: { artist: true } }),
      this.prisma.favoriteAlbum.findMany({ include: { album: true } }),
      this.prisma.favoriteTrack.findMany({ include: { track: true } }),
    ]);

    return {
      tracks: tracks.map((f) => f.track),
      albums: albums.map((f) => f.album),
      artists: artists.map((f) => f.artist),
    };
  }

  async addArtist(artistId: string): Promise<void> {
    await this.prisma.favoriteArtist.create({ data: { artistId } });
  }
  async removeArtist(artistId: string): Promise<void> {
    await this.prisma.favoriteArtist.delete({ where: { artistId } });
  }

  async addAlbum(albumId: string): Promise<void> {
    await this.prisma.favoriteAlbum.create({ data: { albumId } });
  }
  async removeAlbum(albumId: string): Promise<void> {
    await this.prisma.favoriteAlbum.delete({ where: { albumId } });
  }

  async addTrack(trackId: string): Promise<void> {
    await this.prisma.favoriteTrack.create({ data: { trackId } });
  }
  async removeTrack(trackId: string): Promise<void> {
    await this.prisma.favoriteTrack.delete({ where: { trackId } });
  }
}
