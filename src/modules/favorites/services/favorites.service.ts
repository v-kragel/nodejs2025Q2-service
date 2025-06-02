import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from '../repositories';
import { ArtistsService } from '@/modules/artists';
import { AlbumsService } from '@/modules/albums';
import { TracksService } from '@/modules/tracks';
import { FavoritesResponseDto } from '../dto';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(FavoritesRepository)
    private readonly favoritesRepo: FavoritesRepository,

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  async getAll(): Promise<FavoritesResponseDto> {
    const {
      artists: artistIds,
      albums: albumIds,
      tracks: trackIds,
    } = await this.favoritesRepo.getAll();

    const storedArtists = await this.artistsService.findAll();
    const storedAlbums = await this.albumsService.findAll();
    const storedTracks = await this.tracksService.findAll();

    return {
      artists: storedArtists.filter((a) => artistIds.includes(a.id)),
      albums: storedAlbums.filter((a) => albumIds.includes(a.id)),
      tracks: storedTracks.filter((t) => trackIds.includes(t.id)),
    };
  }

  async addArtist(id: string): Promise<void> {
    const artists = await this.artistsService.findAll();

    const artist = artists.find((a) => a.id === id);

    if (!artist) throw new UnprocessableEntityException(`Artist not found`);

    this.favoritesRepo.addArtist(id);
  }

  async removeArtist(id: string): Promise<void> {
    await this.favoritesRepo.removeArtist(id);
  }

  async addAlbum(id: string): Promise<void> {
    const albums = await this.albumsService.findAll();

    const album = albums.find((a) => a.id === id);

    if (!album) throw new UnprocessableEntityException(`Album not found`);

    this.favoritesRepo.addAlbum(id);
  }

  async removeAlbum(id: string): Promise<void> {
    await this.favoritesRepo.removeAlbum(id);
  }

  async addTrack(id: string): Promise<void> {
    const tracks = await this.tracksService.findAll();

    const track = tracks.find((t) => t.id === id);

    if (!track) throw new UnprocessableEntityException(`Track not found`);

    this.favoritesRepo.addTrack(id);
  }

  async removeTrack(id: string): Promise<void> {
    await this.favoritesRepo.removeTrack(id);
  }
}
