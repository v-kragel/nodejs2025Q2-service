import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto';
import { User } from '../models';
import { Serialize, UuidParamPipe } from '@/common';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserResponseDto)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Serialize(UserResponseDto)
  @Get(':id')
  async findOne(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Serialize(UserResponseDto)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    dto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.create(dto);
  }

  @Serialize(UserResponseDto)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', UuidParamPipe)
    id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<void> {
    await this.usersService.delete(id);
  }
}
