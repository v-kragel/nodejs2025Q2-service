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

  private generateToken(
    payload: { userId: string; login: string },
    secret: string,
    expiresIn: string,
  ) {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
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

    return {
      accessToken: this.generateToken(
        payload,
        process.env.JWT_SECRET_KEY,
        process.env.TOKEN_EXPIRE_TIME,
      ),
      refreshToken: this.generateToken(
        payload,
        process.env.JWT_SECRET_REFRESH_KEY,
        process.env.TOKEN_REFRESH_EXPIRE_TIME,
      ),
    };
  }
}
