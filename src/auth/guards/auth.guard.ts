import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { UserService } from '../../user/services/user.service';
import { PUBLIC_KEY } from '../../constants/key-decorator';
import { IUseToken } from '../interfaces/auth.interface';
import { useToken } from '../../utils/use.token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['token'];

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid Token');
    }

    const managerToken: IUseToken | string = useToken(token);

    if (typeof managerToken === 'string') {
      throw new UnauthorizedException(managerToken);
    }

    if (managerToken.isExpired) {
      throw new UnauthorizedException('Token is expired');
    }

    const { sub } = managerToken;
    const user = await this.userService.findOne(+sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.idUser = user.id;
    request.roleUser = user.role;

    return true;
  }
}
