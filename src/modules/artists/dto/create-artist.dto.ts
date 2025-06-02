import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateArtistDto {
  @IsString({ message: 'Name value must be string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsBoolean({ message: 'Grammy value must be boolean' })
  grammy: boolean;
}
