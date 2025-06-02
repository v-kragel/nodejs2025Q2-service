import { Track } from '../models';

export abstract class TracksRepository {
  abstract findAll(): Promise<Track[]>;
  abstract findById(id: string): Promise<Track | null>;
  abstract create(track: Track): Promise<Track>;
  abstract update(track: Track): Promise<void>;
  abstract delete(id: string): Promise<boolean>;
  abstract findAllByArtistId(id: string): Promise<Track[]>;
  abstract findAllByAlbumId(id: string): Promise<Track[]>;
  abstract bulkUpdate(tracks: Track[]): Promise<void>;
}
