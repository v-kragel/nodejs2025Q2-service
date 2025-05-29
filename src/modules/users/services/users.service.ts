import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../models';
import { UsersRepository } from '../repositories';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepo: UsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepo.findAll();
  }

  async findById(id: string) {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id <${id}> not found`);
    }

    return user;
  }
}
