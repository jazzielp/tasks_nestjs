import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ROLES } from '../../constants/roles';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly fistName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsEnum(ROLES)
  readonly role: ROLES;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
