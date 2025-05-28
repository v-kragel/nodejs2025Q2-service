import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepo: UsersRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.findAll();
  }
}
