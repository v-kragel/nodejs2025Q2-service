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

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(updatedUser: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === updatedUser.id);

    if (index === -1) {
      throw new Error('User not found');
    }

    this.users[index] = updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) return false;

    this.users.splice(index, 1);

    return true;
  }
}
