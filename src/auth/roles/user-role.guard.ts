import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from '@prisma/client';

type ReqUser = { email: string; role: Role } | undefined;

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [];

    if (required.length === 0) return true;

    const req = context.switchToHttp().getRequest<{ user?: ReqUser }>();
    const user = req.user;

    if (!user) throw new ForbiddenException('Missing user');
    if (!required.includes(user.role)) throw new ForbiddenException('Missing privileges');

    return true;
  }
}
