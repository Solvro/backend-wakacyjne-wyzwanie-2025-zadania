import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { hasRole } from "@/lib/roles";

import { RequestWithUser } from "../dto/auth.dto";
import { ROLES_KEY } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<number[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles required, allow access
    if (requiredRoles.length === 0) {
      return true;
    }

    const request: RequestWithUser = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if user exists and has roles
    if (user === undefined) {
      return false;
    }

    if (typeof user.roles !== "string" || user.roles.length === 0) {
      return false;
    }

    // Check if user has any of the required roles using the binary string system
    return requiredRoles.some((role) => hasRole(user.roles, role));
  }
}
