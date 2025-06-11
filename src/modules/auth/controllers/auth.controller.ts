import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services';
import { CreateUserDto, UserResponseDto } from '@/modules/users';
import { Serialize } from '@/common';
import { LoginDto } from '../dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

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

    @Res({ passthrough: true })
    res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return { accessToken };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const tokens = this.authService.generateTokens({
        userId: payload.userId,
        login: payload.login,
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });

      return { accessToken: tokens.accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
