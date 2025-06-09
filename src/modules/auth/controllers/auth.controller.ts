import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services';
import { CreateUserDto, UserResponseDto } from '@/modules/users';
import { Serialize } from '@/common';
import { LoginDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(UserResponseDto)
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body()
    dto: CreateUserDto,
  ) {
    return await this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(
    @Body()
    dto: LoginDto,
  ) {
    return this.authService.login(dto);
  }
}
