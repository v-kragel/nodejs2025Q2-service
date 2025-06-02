import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from '../models';
import { AlbumsRepository } from '../repositories';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto';
import { v4 } from 'uuid';
import { TracksService } from '@/modules/tracks';
import { FavoritesService } from '@/modules/favorites';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(AlbumsRepository)
    private readonly albumsRepo: AlbumsRepository,

    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async findAll(): Promise<Album[]> {
    return await this.albumsRepo.findAll();
  }

  async findById(id: string): Promise<Album> {
    const album = await this.albumsRepo.findById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      id: v4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    };

    return await this.albumsRepo.create(album);
  }

  async update(albumId: string, dto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumsRepo.findById(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum: Album = {
      ...album,
      name: dto.name || album.name,
      year: dto.year || album.year,
      artistId: dto.artistId || album.artistId || null,
    };

    await this.albumsRepo.update(updatedAlbum);

    return updatedAlbum;
  }

  async delete(albumId: string): Promise<void> {
    const album = await this.albumsRepo.findById(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.tracksService.removeAlbumReferences(albumId);

    await this.favoritesService.removeAlbum(albumId);

    await this.albumsRepo.delete(albumId);
  }

  async removeArtistReferences(artistId: string): Promise<void> {
    const albums = await this.albumsRepo.findAllByArtistId(artistId);

    const updated = albums.map((album) => ({
      ...album,
      artistId: null,
    }));

    await this.albumsRepo.bulkUpdate(updated);
  }
}
