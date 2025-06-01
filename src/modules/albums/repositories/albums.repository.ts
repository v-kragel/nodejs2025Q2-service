import { Album } from '../models';

export abstract class AlbumsRepository {
  abstract findAll(): Promise<Album[]>;
  abstract findById(id: string): Promise<Album | null>;
  abstract create(album: Album): Promise<Album>;
  abstract update(album: Album): Promise<void>;
  abstract delete(id: string): Promise<boolean>;
  abstract findAllByArtistId(id: string): Promise<Album[]>;
  abstract bulkUpdate(albums: Album[]): Promise<void>;
}
