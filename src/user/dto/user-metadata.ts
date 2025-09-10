import type { User } from "@prisma/client";

export class UserMetadata {
  email: string;
  isEnabled: boolean;
  UserRole: string;
}

export function userToMetadata(user: User): UserMetadata {
  return {
    email: user.email,
    isEnabled: user.isEnabled,
    UserRole: user.UserRole,
  };
}
