import { Global, Module } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/services/user.service';
import { AuthController } from './controllers/auth.controller';

@Global()
@Module({
  imports: [UserModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
