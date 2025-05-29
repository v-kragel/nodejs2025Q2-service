import { CreateUserDto } from '../dto';
import { User } from '../models';

export abstract class UsersRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: User): Promise<User>;
}
