import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from '../services';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.usersService.findById(id);
  }
}
