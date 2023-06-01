import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { PUBLIC_KEY, ROLES_KEY } from '../../constants/key-decorator';
import { ROLES } from '../../constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest<Request>();

    const { roleUser } = request;
    console.log(roleUser);
    console.log(roles);

    if (roles === undefined) {
      return true;
    }

    const isRole = roles.some((role) => role === roleUser);

    if (!isRole) {
      throw new UnauthorizedException(
        'You do not have permission for this operation',
      );
    }
    return true;
  }
}
