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
import { UuidParamPipe } from '@/common/pipes/uuid-param.pipe';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<UserResponseDto> {
    return this.usersService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    dto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', UuidParamPipe)
    id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', UuidParamPipe)
    id: string,
  ): Promise<undefined> {
    await this.usersService.delete(id);
    return;
  }
}
