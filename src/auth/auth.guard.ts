import { Request } from "express";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (authHeader === undefined || authHeader.length === 0) {
      throw new UnauthorizedException("No token provided");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Invalid token format");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Invalid token");
    }

    try {
      const userMetadata = await this.authService.validateToken(token);
      if (userMetadata === null) {
        throw new UnauthorizedException("Invalid or expired token");
      }

      (request as Request & { user: unknown }).user = userMetadata;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
