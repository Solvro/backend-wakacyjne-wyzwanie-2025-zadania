import type { Role, User } from "@prisma/client";

export interface UserMetadata {
  email: string;
  role: Role;
  userId: number;
}

export function userToMetadata(user: User): UserMetadata {
  return {
    email: user.email,
    role: user.role,
    userId: user.user_id,
  };
}
