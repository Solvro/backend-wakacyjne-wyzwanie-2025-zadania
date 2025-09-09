import type { User } from "@prisma/client";

export class UserMetadata {
  email: string;
  isEnabled: boolean;
  role: string;
}

export function userToMetadata(user: User): UserMetadata {
  return {
    email: user.email,
    isEnabled: user.isEnabled,
    role: user.role,
  };
}
