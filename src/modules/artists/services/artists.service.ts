import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../models';
import { ArtistsRepository } from '../repositories';
import { CreateArtistDto, UpdateArtistDto } from '../dto';
import { v4 } from 'uuid';
import { AlbumsService } from '@/modules/albums';
import { TracksService } from '@/modules/tracks';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(ArtistsRepository)
    private readonly artistsRepo: ArtistsRepository,

    @Inject(AlbumsService)
    private readonly albumsService: AlbumsService,

    @Inject(TracksService)
    private readonly tracksService: TracksService,
  ) {}

  async findAll(): Promise<Artist[]> {
    return await this.artistsRepo.findAll();
  }

  async findById(id: string): Promise<Artist> {
    const artist = await this.artistsRepo.findById(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = {
      id: v4(),
      name: dto.name,
      grammy: dto.grammy,
    };

    return await this.artistsRepo.create(artist);
  }

  async update(artistId: string, dto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistsRepo.findById(artistId);

    if (!artist) {
      throw new NotFoundException('User not found');
    }

    const updatedArtist: Artist = {
      ...artist,
      name: dto.name || artist.name,
      grammy: dto.grammy || artist.grammy,
    };

    await this.artistsRepo.update(updatedArtist);

    return updatedArtist;
  }

  async delete(artistId: string): Promise<void> {
    const artist = this.artistsRepo.findById(artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.albumsService.removeArtistReferences(artistId);

    await this.tracksService.removeArtistReferences(artistId);

    await this.artistsRepo.delete(artistId);
  }
}
