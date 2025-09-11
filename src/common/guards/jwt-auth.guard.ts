import { UserRole } from "@prisma/client";
import type { Request } from "express";
import { verify } from "jsonwebtoken";
import type { JwtPayload as LibraryJwtPayload } from "jsonwebtoken";

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

export interface JwtPayload {
  sub: number;
  role: UserRole;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

function getEnv(): {
  JWT_SECRET: string;
  JWT_ISSUER?: string;
  JWT_AUDIENCE?: string;
} {
  const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;
  if (JWT_SECRET === undefined) {
    throw new Error("Nie ustawiono ziarna dla JWT (JWT_SECRET)");
  }
  return { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();

    const authHeader = request.headers.authorization;
    if (typeof authHeader !== "string" || authHeader.length === 0) {
      throw new UnauthorizedException("Missing Authorization header");
    }

    const [scheme, token] = authHeader.split(" ");
    if (
      scheme !== "Bearer" ||
      typeof token !== "string" ||
      token.length === 0
    ) {
      throw new UnauthorizedException("Invalid Authorization format");
    }

    const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = getEnv();

    let decoded: LibraryJwtPayload | string;
    try {
      decoded = verify(token, JWT_SECRET, {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      });
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }

    if (typeof decoded === "string") {
      throw new UnauthorizedException("Malformed token payload");
    }

    const subRaw = decoded.sub;
    const roleRaw = (decoded as unknown as { role?: unknown }).role;

    const sub =
      typeof subRaw === "number"
        ? subRaw
        : typeof subRaw === "string" && /^[1-9]\d*$/.test(subRaw) // giga nie umiem regexów ale ten chyba działa
          ? Number(subRaw)
          : Number.NaN;

    if (!Number.isInteger(sub)) {
      throw new ForbiddenException("Token missing or invalid subject");
    }

    if (roleRaw !== "USER" && roleRaw !== "ADMIN") {
      throw new ForbiddenException("Token missing or invalid role");
    }

    request.user = {
      sub,
      role: roleRaw,
      iat: decoded.iat,
      exp: decoded.exp,
      iss: decoded.iss,
      aud: typeof decoded.aud === "string" ? decoded.aud : undefined,
    };

    return true;
  }
}
