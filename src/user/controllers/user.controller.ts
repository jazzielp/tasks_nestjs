import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Get,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UserService } from '../services/user.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
