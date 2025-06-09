import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { UsersModule } from '../users';
import { JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
