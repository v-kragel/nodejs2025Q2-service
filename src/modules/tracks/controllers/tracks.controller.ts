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
  UseGuards,
} from '@nestjs/common';
import { TracksService } from '../services';
import { Serialize, UuidParamPipe } from '@/common';
import { TrackResponseDto, CreateTrackDto, UpdateTrackDto } from '../dto';
import { Track } from '../models';
import { JwtAuthGuard } from '@/modules/auth';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @UseGuards(JwtAuthGuard)
  @Serialize(TrackResponseDto)
  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(TrackResponseDto)
  @Get(':id')
  async findOne(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<Track> {
    return await this.tracksService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(TrackResponseDto)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    dto: CreateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<void> {
    await this.tracksService.delete(id);
  }
}
