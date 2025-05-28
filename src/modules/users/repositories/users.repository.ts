import { User } from '../models';

export abstract class UsersRepository {
  abstract findAll(): Promise<User[]>;
}
