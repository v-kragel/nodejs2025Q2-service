import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString({ message: 'Name value must be string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsInt({ message: 'Duration value must be number' })
  @IsPositive({ message: 'Duration value must be positive' })
  duration: number;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID('4', { message: 'artistId must be a valid UUID v4 or null' })
  @IsOptional()
  artistId?: string | null;

  @ValidateIf((obj) => obj.albumId !== null)
  @IsUUID('4', { message: 'albumId must be a valid UUID v4 or null' })
  @IsOptional()
  albumId?: string | null;
}
