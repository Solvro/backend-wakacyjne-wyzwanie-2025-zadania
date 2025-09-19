import { Request } from "express";

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { JwtPayload, UserRole } from "../../src/common/types";

type RequestWithUser = Request & { user: Partial<JwtPayload> };

@Injectable()
export class MockJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    request.user = { sub: 1, role: UserRole.ADMIN };
    return true;
  }
}
