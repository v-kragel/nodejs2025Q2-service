import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

const CURRENT_YEAR = new Date().getFullYear();

export class CreateAlbumDto {
  @IsString({ message: 'Name value must be string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsInt({ message: 'Year must be a number' })
  @Min(1900, { message: 'Year must be greater than 1900' })
  @Max(CURRENT_YEAR, {
    message: `Year must not be greater than ${CURRENT_YEAR}`,
  })
  year: number;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID('4', { message: 'artistId must be a valid UUID v4 or null' })
  @IsOptional()
  artistId?: string | null;
}
