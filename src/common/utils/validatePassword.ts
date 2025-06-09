import { compare } from 'bcrypt';

export async function validatePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await compare(password, hash);
}
