import { Request } from "express";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { IS_PUBLIC_KEY } from "../../common/decorators/public.decorator";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: unknown }>();

    const header = request.headers.authorization;

    if (header == null) {
      throw new UnauthorizedException("Missing Authorization header");
    }

    if (!header.startsWith("Bearer ")) {
      throw new UnauthorizedException("Invalid Authorization header format");
    }

    const token = header.slice(7);

    try {
      const userMeta = await this.authService.validateToken(token);
      request.user = userMeta; // attach to request
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid or expired token";
      throw new UnauthorizedException(message);
    }
  }
}
