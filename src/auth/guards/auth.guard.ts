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

    const rawHeader =
      request.headers.authorization ?? request.headers.Authorization;
    const header: string | undefined = Array.isArray(rawHeader)
      ? rawHeader[0]
      : rawHeader;

    if (typeof header !== "string") {
      throw new UnauthorizedException("Missing Authorization header");
    }

    const token = header.startsWith("Bearer ") ? header.slice(7) : header;

    if (!token) {
      throw new UnauthorizedException("Invalid Authorization header format");
    }

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
