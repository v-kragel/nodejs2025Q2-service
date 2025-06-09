import { Artist, CreateArtistInput } from '../models';

export abstract class ArtistsRepository {
  abstract findAll(): Promise<Artist[]>;
  abstract findById(id: string): Promise<Artist | null>;
  abstract create(artist: CreateArtistInput): Promise<Artist>;
  abstract update(artist: Artist): Promise<Artist>;
  abstract delete(id: string): Promise<Artist>;
}
