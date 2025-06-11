import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { UsersService } from './services';
import { PrismaUsersRepository } from './repositories';
import { UsersRepository } from './repositories';
import { AuthModule } from '../auth';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
