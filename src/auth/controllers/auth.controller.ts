import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../entities/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    //We inject the service
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.username, loginDto.password);
  }
}
