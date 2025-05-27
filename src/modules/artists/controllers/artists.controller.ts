import { Controller, Get } from '@nestjs/common';
import { ArtistsService } from '../services';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }
}
