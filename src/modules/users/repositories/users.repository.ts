import { CreateUserInput, User } from '../models';

export abstract class UsersRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: CreateUserInput): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract delete(id: string): Promise<User>;
}
