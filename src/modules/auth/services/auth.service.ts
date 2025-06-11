import { CreateUserDto, User, UsersService } from '@/modules/users';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { LoginDto, TokenResponse } from '../dto';
import { validatePassword } from '@/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  generateTokens(payload: { userId: string; login: string }): TokenResponse {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  async signup(dto: CreateUserDto): Promise<User> {
    const { login, password } = dto;

    const existing = await this.usersService.findByLogin(login);

    if (existing) {
      throw new BadRequestException('User with this login already exists');
    }

    const hashedPassword = await hash(password, 10);

    return await this.usersService.create({
      login,
      password: hashedPassword,
    });
  }

  async login(dto: LoginDto): Promise<TokenResponse> {
    const { login, password } = dto;

    const existing = await this.usersService.findByLogin(login);

    if (!existing) {
      throw new ForbiddenException('Invalid login');
    }

    const isPasswordValid = await validatePassword(password, existing.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid password');
    }

    const payload = { userId: existing.id, login: existing.login };
    const tokens = this.generateTokens(payload);

    return tokens;
  }
}
