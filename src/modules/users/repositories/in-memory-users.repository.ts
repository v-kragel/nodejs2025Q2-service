import { Injectable } from '@nestjs/common';
import { User } from '../models';
import { UsersRepository } from './users.repository';

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }
}
