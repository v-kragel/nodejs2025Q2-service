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
import { AlbumsService } from '../services';
import { Serialize } from '@/common/decorators';
import { AlbumResponseDto, CreateAlbumDto, UpdateAlbumDto } from '../dto';
import { UuidParamPipe } from '@/common/pipes';
import { Album } from '../models';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Serialize(AlbumResponseDto)
  @Get()
  async findAll() {
    return this.albumsService.findAll();
  }

  @Serialize(AlbumResponseDto)
  @Get(':id')
  async findOne(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<Album> {
    return await this.albumsService.findById(id);
  }

  @Serialize(AlbumResponseDto)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    dto: CreateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.create(dto);
  }

  @Serialize(AlbumResponseDto)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', UuidParamPipe)
    id: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<void> {
    await this.albumsService.delete(id);
  }
}
