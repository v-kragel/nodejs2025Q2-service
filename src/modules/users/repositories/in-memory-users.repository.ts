import { Injectable } from '@nestjs/common';
import { User } from '../models';
import { UsersRepository } from './users.repository';

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
