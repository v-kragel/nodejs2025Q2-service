import { Injectable } from '@nestjs/common';
import { User } from '../models';
import { UsersRepository } from './users.repository';
import { PrismaService } from '@/prisma';
import { UpdateUserDto } from '../dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return user;
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { login } });
    if (!user) return null;
    return user;
  }

  async create(user: User): Promise<User> {
    return await this.prisma.user.create({ data: { ...user } });
  }

  async update(userId: string, dto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
      },
    });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
