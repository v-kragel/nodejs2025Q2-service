import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from '../services';
import { Serialize } from '@/common/decorators';
import { TrackResponseDto, CreateTrackDto, UpdateTrackDto } from '../dto';
import { UuidParamPipe } from '@/common/pipes';
import { Track } from '../models';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Serialize(TrackResponseDto)
  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Serialize(TrackResponseDto)
  @Get(':id')
  async findOne(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<Track> {
    return await this.tracksService.findById(id);
  }

  @Serialize(TrackResponseDto)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    dto: CreateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.create(dto);
  }

  @Serialize(TrackResponseDto)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', UuidParamPipe)
    id: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<void> {
    await this.tracksService.delete(id);
  }
}
