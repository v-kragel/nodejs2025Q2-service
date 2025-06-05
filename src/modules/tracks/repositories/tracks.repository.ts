import { CreateTrackInput, Track } from '../models';

export abstract class TracksRepository {
  abstract findAll(): Promise<Track[]>;
  abstract findById(id: string): Promise<Track | null>;
  abstract create(track: CreateTrackInput): Promise<Track>;
  abstract update(track: Track): Promise<Track>;
  abstract delete(id: string): Promise<Track>;
}
