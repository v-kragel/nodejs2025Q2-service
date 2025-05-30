import { Artist } from '../models';

export abstract class ArtistsRepository {
  abstract findAll(): Promise<Artist[]>;
  abstract findById(id: string): Promise<Artist | null>;
  abstract create(artist: Artist): Promise<Artist>;
  abstract update(artist: Artist): Promise<void>;
  abstract delete(id: string): Promise<boolean>;
}
