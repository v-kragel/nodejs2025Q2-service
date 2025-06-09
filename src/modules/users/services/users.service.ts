import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput, User } from '../models';
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
    const user: CreateUserInput = {
      id: v4(),
      login: dto.login,
      password: dto.password,
      version: 1,
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

    const updatedUser = await this.usersRepo.update(userId, dto);

    return updatedUser;
  }

  async delete(userId: string): Promise<void> {
    const user = await this.usersRepo.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepo.delete(userId);
  }
}
