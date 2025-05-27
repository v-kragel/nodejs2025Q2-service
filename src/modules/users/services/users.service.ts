import { Injectable } from '@nestjs/common';
import { User } from '../models';
import { InMemoryUsersRepository } from '../repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: InMemoryUsersRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.findAll();
  }
}
