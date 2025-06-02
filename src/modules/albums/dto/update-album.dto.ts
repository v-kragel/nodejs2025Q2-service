import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';

const CURRENT_YEAR = new Date().getFullYear();

export class UpdateAlbumDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name?: string;

  @IsOptional()
  @IsInt({ message: 'Year must be an integer' })
  @Min(1900, { message: 'Year must not be earlier than 1900' })
  @Max(CURRENT_YEAR, {
    message: `Year must not be greater than ${CURRENT_YEAR}`,
  })
  year?: number;

  @IsOptional()
  @IsUUID('4', { message: 'ArtistId must be a valid UUID' })
  artistId?: string | null;
}
