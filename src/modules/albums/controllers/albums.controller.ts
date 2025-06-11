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
import { AlbumsService } from '../services';
import { Serialize, UuidParamPipe } from '@/common';
import { AlbumResponseDto, CreateAlbumDto, UpdateAlbumDto } from '../dto';
import { Album } from '../models';
import { JwtAuthGuard } from '@/modules/auth';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @UseGuards(JwtAuthGuard)
  @Serialize(AlbumResponseDto)
  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(AlbumResponseDto)
  @Get(':id')
  async findOne(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<Album> {
    return await this.albumsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(AlbumResponseDto)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    dto: CreateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<void> {
    await this.albumsService.delete(id);
  }
}
