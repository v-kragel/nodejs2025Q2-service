import { Album, CreateAlbumInput } from '../models';

export abstract class AlbumsRepository {
  abstract findAll(): Promise<Album[]>;
  abstract findById(id: string): Promise<Album | null>;
  abstract create(album: CreateAlbumInput): Promise<Album>;
  abstract update(album: Album): Promise<Album>;
  abstract delete(id: string): Promise<Album>;
}
