import { Request } from "express";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserRequest } from "./dto/user-request.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: UserRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token === undefined) {
      throw new UnauthorizedException("Missing token");
    }

    try {
      request.user = await this.service.validateToken(token);
    } catch (error: unknown) {
      throw new UnauthorizedException((error as Error).message);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
