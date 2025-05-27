import { Injectable } from '@nestjs/common';
import { Album } from '../models';

@Injectable()
export class InMemoryAlbumsRepository {
  private albums: Album[] = [];

  async findAll(): Promise<Album[]> {
    return this.albums;
  }
}
