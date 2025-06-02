import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from '../models';
import { TracksRepository } from '../repositories';
import { CreateTrackDto, UpdateTrackDto } from '../dto';
import { v4 } from 'uuid';
import { FavoritesService } from '@/modules/favorites';

@Injectable()
export class TracksService {
  constructor(
    @Inject(TracksRepository)
    private readonly tracksRepo: TracksRepository,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async findAll(): Promise<Track[]> {
    return await this.tracksRepo.findAll();
  }

  async findById(id: string): Promise<Track> {
    const track = await this.tracksRepo.findById(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const track: Track = {
      id: v4(),
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
    };

    return await this.tracksRepo.create(track);
  }

  async update(trackId: string, dto: UpdateTrackDto): Promise<Track> {
    const track = await this.tracksRepo.findById(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack: Track = {
      ...track,
      name: dto.name || track.name,
      duration: dto.duration || track.duration,
      artistId: dto.artistId || track.artistId || null,
      albumId: dto.albumId || track.albumId || null,
    };

    await this.tracksRepo.update(updatedTrack);

    return updatedTrack;
  }

  async delete(trackId: string): Promise<void> {
    const track = await this.tracksRepo.findById(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.favoritesService.removeTrack(trackId);

    await this.tracksRepo.delete(trackId);
  }

  async removeArtistReferences(artistId: string): Promise<void> {
    const tracks = await this.tracksRepo.findAllByArtistId(artistId);

    const updated = tracks.map((track) => ({
      ...track,
      artistId: null,
    }));

    await this.tracksRepo.bulkUpdate(updated);
  }

  async removeAlbumReferences(albumId: string): Promise<void> {
    const tracks = await this.tracksRepo.findAllByAlbumId(albumId);

    const updated = tracks.map((track) => ({
      ...track,
      albumId: null,
    }));

    await this.tracksRepo.bulkUpdate(updated);
  }
}
