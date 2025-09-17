import type { Role, User } from "@prisma/client";

export interface UserMetadata {
  email: string;
  role: Role;
}

export function userToMetadata(user: User) {
  return {
    email: user.email,
    role: user.role,
  };
}
