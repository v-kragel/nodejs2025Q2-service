import { Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { UsersService } from './services';
import { InMemoryUsersRepository } from './repositories';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryUsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
