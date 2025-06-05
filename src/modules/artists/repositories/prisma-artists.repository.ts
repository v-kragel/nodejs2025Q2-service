import { Injectable } from '@nestjs/common';
import { Artist, CreateArtistInput } from '../models';
import { ArtistsRepository } from './artists.repository';
import { PrismaService } from '@/prisma';

@Injectable()
export class PrismaArtistsRepository implements ArtistsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async findById(id: string): Promise<Artist | null> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) return null;
    return artist;
  }

  async create(artist: CreateArtistInput): Promise<Artist> {
    return await this.prisma.artist.create({ data: { ...artist } });
  }

  async update(artist: Artist): Promise<Artist> {
    await this.findById(artist.id);
    return this.prisma.artist.update({
      where: { id: artist.id },
      data: { ...artist },
    });
  }

  async delete(id: string): Promise<Artist> {
    await this.findById(id);
    return await this.prisma.artist.delete({ where: { id } });
  }
}
