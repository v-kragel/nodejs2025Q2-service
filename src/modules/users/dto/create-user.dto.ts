import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Login value must be string' })
  @MinLength(3, { message: 'Login must be at least 3 characters long' })
  login: string;

  @IsString({ message: 'Password value must be string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
