import type { Type as AuthRole } from "@prisma/client";

export interface JwtPayload {
  sub: string; // email as primary key
  email: string;
  role: AuthRole;
  iat: number;
}
