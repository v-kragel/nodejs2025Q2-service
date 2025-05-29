import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services';
import { CreateUserDto } from '../dto';
import { User } from '../models';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  async create(
    @Body()
    dto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(dto);
  }
}
