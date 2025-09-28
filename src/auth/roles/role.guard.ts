import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";

import { LoginResponseDto } from "../dto/response-login.dto";
import { ROLES_KEY } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (requiredRoles.length === 0) {
      return true;
    }
    const request: LoginResponseDto = context.switchToHttp().getRequest();
    return request.user?.role.some((r) => requiredRoles.includes(r)) ?? false;
  }
}
