import { Injectable } from '@nestjs/common';
import { Track } from '../models';
import { TracksRepository } from './tracks.repository';
import { PrismaService } from '@/prisma';

@Injectable()
export class PrismaTracksRepository implements TracksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async findById(id: string): Promise<Track | null> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) return null;
    return track;
  }

  async create(track: Track): Promise<Track> {
    return await this.prisma.track.create({ data: { ...track } });
  }

  async update(track: Track): Promise<Track> {
    await this.findById(track.id);
    return this.prisma.track.update({
      where: { id: track.id },
      data: { ...track },
    });
  }

  async delete(id: string): Promise<Track> {
    await this.findById(id);
    return await this.prisma.track.delete({ where: { id } });
  }
}
