import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly status: boolean;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly user: User;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
