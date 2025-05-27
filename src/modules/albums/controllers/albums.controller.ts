import { Controller, Get } from '@nestjs/common';
import { AlbumsService } from '../services';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }
}
