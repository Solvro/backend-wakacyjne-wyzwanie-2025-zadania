import { Role } from "@prisma/client";

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "../../common/decorators/roles.decorator";

interface RequestUser {
  email: string;
  role: Role;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[] | undefined>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles == null || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: RequestUser }>();

    const user = request.user;

    if (!user?.role) {
      throw new ForbiddenException("No roles assigned");
    }

    if (requiredRoles.includes(user.role)) {
      return true;
    }

    throw new ForbiddenException("Insufficient permissions");
  }
}
