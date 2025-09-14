import type { AuthRole } from "@prisma/client";

export interface JwtPayload {
  sub: string; // email as primary key
  role: AuthRole;
  iat: number;
  exp: number;
}

export type RequestWithUser = Request & { user?: JwtPayload };
