import { Injectable } from '@nestjs/common';
import { User } from '../models';
import { UsersRepository } from './users.repository';
import { PrismaService } from '@/prisma';

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

  async create(user: User): Promise<User> {
    return await this.prisma.user.create({ data: { ...user } });
  }

  async update(updatedUser: User): Promise<User> {
    await this.findById(updatedUser.id);
    return await this.prisma.user.update({
      where: { id: updatedUser.id },
      data: {
        ...updatedUser,
        version: { increment: 1 },
      },
    });
  }

  async delete(id: string): Promise<User> {
    await this.findById(id);
    return await this.prisma.user.delete({ where: { id } });
  }
}
