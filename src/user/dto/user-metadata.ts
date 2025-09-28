import type { Role, User } from "@prisma/client";

export interface UserMetadata {
  email: string;
  login: string;
  role: Role[];
}

export function userToMetadata(user: User): UserMetadata {
  return {
    email: user.email,
    login: user.login,
    role: user.role,
  };
}
