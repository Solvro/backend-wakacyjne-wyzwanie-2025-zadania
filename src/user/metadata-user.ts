import type { AuthRole, User } from "@prisma/client";

export interface UserMetadata {
  email: string;
  role: AuthRole;
}

export function userToMetadata(user: User) {
  return {
    email: user.email,
    role: user.role,
  };
}
