import { Injectable } from '@nestjs/common';
import { User } from '../models';

@Injectable()
export class InMemoryUsersRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
