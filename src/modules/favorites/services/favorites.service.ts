import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from '../repositories';
import { ArtistsService } from '@/modules/artists';
import { AlbumsService } from '@/modules/albums';
import { TracksService } from '@/modules/tracks';
import { Favorites } from '../models';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(FavoritesRepository)
    private readonly favoritesRepo: FavoritesRepository,

    @Inject(ArtistsService)
    private readonly artistsService: ArtistsService,

    @Inject(AlbumsService)
    private readonly albumsService: AlbumsService,

    @Inject(TracksService)
    private readonly tracksService: TracksService,
  ) {}

  async getAll(): Promise<Favorites> {
    return await this.favoritesRepo.getAll();
  }

  async addArtist(id: string): Promise<void> {
    try {
      await this.artistsService.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Artist not found');
      }
      throw error;
    }

    await this.favoritesRepo.addArtist(id);
  }

  async removeArtist(id: string): Promise<void> {
    await this.favoritesRepo.removeArtist(id);
  }

  async addAlbum(id: string): Promise<void> {
    try {
      await this.albumsService.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Album not found');
      }
      throw error;
    }

    await this.favoritesRepo.addAlbum(id);
  }

  async removeAlbum(id: string): Promise<void> {
    await this.favoritesRepo.removeAlbum(id);
  }

  async addTrack(id: string): Promise<void> {
    try {
      await this.tracksService.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Track not found');
      }
      throw error;
    }

    await this.favoritesRepo.addTrack(id);
  }

  async removeTrack(id: string): Promise<void> {
    await this.favoritesRepo.removeTrack(id);
  }
}
