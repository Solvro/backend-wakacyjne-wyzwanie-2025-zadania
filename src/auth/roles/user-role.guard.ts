import { UserRole } from "@prisma/client";

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "./role.decorator";

interface RequestUser {
  email: string;
  role: UserRole;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<UserRole[] | undefined>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (required === undefined) {
      return true;
    }

    if (required.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: RequestUser }>();
    const user = request.user;

    if (user === undefined) {
      throw new ForbiddenException("Missing user");
    }

    if (!required.includes(user.role)) {
      throw new ForbiddenException("Missing privileges");
    }

    return true;
  }
}
