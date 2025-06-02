import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Old password must be string' })
  @IsNotEmpty({ message: 'Old password is required' })
  oldPassword: string;

  @IsString({ message: 'New password must be string' })
  @MinLength(3, { message: 'New password must be at least 3 characters long' })
  newPassword: string;
}
