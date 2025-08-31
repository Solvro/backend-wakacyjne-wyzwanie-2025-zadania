import type { User } from "@prisma/client";

export class UserMetadata {
  email: string;
  roles: string;
}

export function userToMetadata(user: User): UserMetadata {
  return {
    email: user.email,
    roles: user.roles,
  };
}
