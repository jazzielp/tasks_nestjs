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
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles('ADMIN')
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
