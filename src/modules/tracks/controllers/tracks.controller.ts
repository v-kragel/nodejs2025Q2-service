import { Controller, Get } from '@nestjs/common';
import { TracksService } from '../services';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }
}
