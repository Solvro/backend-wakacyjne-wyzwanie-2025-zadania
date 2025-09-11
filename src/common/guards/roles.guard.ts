import type { Request } from "express";

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import type { JwtPayload } from "../../auth/jwt.strategy";
import { AppRole, ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<AppRole[] | undefined>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (required === undefined || required.length === 0) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();
    const role = request.user?.role;
    if (role === undefined) {
      throw new ForbiddenException("No user in request");
    }
    if (!required.includes(role)) {
      throw new ForbiddenException("Insufficient role");
    }
    return true;
  }
}
