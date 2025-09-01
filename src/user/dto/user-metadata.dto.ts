import type { User } from "@prisma/client";

export class UserMetadata {
  id: number;
  email: string;
  roles: string;
}

export function userToMetadata(user: User): UserMetadata {
  return {
    id: user.id,
    email: user.email,
    roles: user.roles,
  };
}
