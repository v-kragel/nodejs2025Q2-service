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
import { ArtistsService } from '../services';
import { Artist } from '../models';
import { ArtistResponseDto, CreateArtistDto, UpdateArtistDto } from '../dto';
import { UuidParamPipe, Serialize } from '@/common';
import { JwtAuthGuard } from '@/modules/auth';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @UseGuards(JwtAuthGuard)
  @Serialize(ArtistResponseDto)
  @Get()
  async findAll(): Promise<Artist[]> {
    return await this.artistsService.findAll();
  }

  @Serialize(ArtistResponseDto)
  @Get(':id')
  async findOne(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<Artist> {
    return await this.artistsService.findById(id);
  }

  @Serialize(ArtistResponseDto)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    dto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.create(dto);
  }

  @Serialize(ArtistResponseDto)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', UuidParamPipe)
    id: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<void> {
    await this.artistsService.delete(id);
  }
}
