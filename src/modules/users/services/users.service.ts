import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../models';
import { UsersRepository } from '../repositories';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto';
import { v4 } from 'uuid';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepo: UsersRepository,
  ) {}

  private toResponseDto(user: User): UserResponseDto {
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepo.findAll();
    return users.map((user) => this.toResponseDto(user));
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toResponseDto(user);
  }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const user: User = {
      id: v4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const created = await this.usersRepo.create(user);

    return this.toResponseDto(created);
  }

  async update(userId: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.usersRepo.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser: User = {
      ...user,
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    await this.usersRepo.update(updatedUser);

    return this.toResponseDto(updatedUser);
  }

  async delete(userId: string): Promise<void> {
    const deleted = await this.usersRepo.delete(userId);

    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }
}
