import type { Role, User } from "@prisma/client";

export interface UserMetadata {
  email: string;
  role: Role;
  isEnabled: boolean;
}

export function userToMetadata(user: User) {
  return {
    email: user.email,
    role: user.role,
    isEnabled: user.isEnabled,
  };
}
