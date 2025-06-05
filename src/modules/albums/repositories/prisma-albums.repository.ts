import { Injectable } from '@nestjs/common';
import { Album, CreateAlbumInput } from '../models';
import { AlbumsRepository } from './albums.repository';
import { PrismaService } from '@/prisma';

@Injectable()
export class PrismaAlbumsRepository implements AlbumsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findById(id: string): Promise<Album | null> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) return null;
    return album;
  }

  async create(album: CreateAlbumInput): Promise<Album> {
    return await this.prisma.album.create({ data: { ...album } });
  }

  async update(album: Album): Promise<Album> {
    await this.findById(album.id);
    return this.prisma.album.update({
      where: { id: album.id },
      data: { ...album },
    });
  }

  async delete(id: string): Promise<Album> {
    await this.findById(id);
    return await this.prisma.album.delete({ where: { id } });
  }
}
