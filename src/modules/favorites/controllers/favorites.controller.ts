import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from '../services';
import { UuidParamPipe, Serialize } from '@/common';
import { FavoritesResponseDto } from '../dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Serialize(FavoritesResponseDto)
  @Get()
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(
    @Param('id', UuidParamPipe)
    id: string,
  ) {
    await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(
    @Param('id', UuidParamPipe)
    id: string,
  ) {
    await this.favoritesService.removeArtist(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(
    @Param('id', UuidParamPipe)
    id: string,
  ) {
    await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(
    @Param('id', UuidParamPipe)
    id: string,
  ) {
    await this.favoritesService.removeAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavorites(
    @Param('id', UuidParamPipe)
    id: string,
  ) {
    await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(
    @Param('id', UuidParamPipe)
    id: string,
  ) {
    await this.favoritesService.removeTrack(id);
  }
}
