import type { UserRole } from "@prisma/client";

export interface JwtPayload {
  sub: number;
  role: UserRole;
  email: string;
  iat: number;
  exp: number;
}
export { UserRole } from "@prisma/client";
