import { Role } from "@prisma/client";

import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { RequestWithUser } from "../dto/request-with-user.dto";
import { ROLES_KEY } from "./role.decorator";

@Injectable()
export class RoleGuard {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (requiredRoles.length === 0) {
      return true;
    }
    const request: RequestWithUser = context.switchToHttp().getRequest();
    return (
      request.user !== undefined && requiredRoles.includes(request.user.role)
    );
  }
}
