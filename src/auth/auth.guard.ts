import { Request } from "express";
import { JwtPayload } from "src/common/interfaces/jwt-payload.interface";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();

    const auth = request.headers.authorization;

    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain, @typescript-eslint/no-unnecessary-condition
    if (auth === undefined || auth === null || !auth.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing bearer token");
    }

    const token = auth.slice(7);

    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });

      if (Date.now() > payload.exp) {
        throw new UnauthorizedException("Token has expired");
      }

      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
