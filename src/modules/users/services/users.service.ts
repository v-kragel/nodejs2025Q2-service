import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../models';
import { UsersRepository } from '../repositories';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepo: UsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepo.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user: User = {
      id: v4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return await this.usersRepo.create(user);
  }

  async update(userId: string, dto: UpdateUserDto): Promise<User> {
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

    return updatedUser;
  }

  async delete(userId: string): Promise<void> {
    const deleted = await this.usersRepo.delete(userId);

    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }
}
