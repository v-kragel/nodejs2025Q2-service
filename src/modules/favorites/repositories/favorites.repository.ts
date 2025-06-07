import { Favorites } from '../models';

export abstract class FavoritesRepository {
  abstract getAll(): Promise<Favorites>;
  abstract addArtist(artistId: string): Promise<void>;
  abstract addAlbum(albumId: string): Promise<void>;
  abstract addTrack(trackId: string): Promise<void>;
  abstract removeArtist(artistId: string): Promise<void>;
  abstract removeAlbum(albumId: string): Promise<void>;
  abstract removeTrack(trackId: string): Promise<void>;
}
