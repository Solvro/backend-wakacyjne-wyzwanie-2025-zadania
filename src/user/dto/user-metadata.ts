import type { Role, User } from "@prisma/client";

export interface UserMetadata {
  email: string;
  role: Role;
}
export function userToMetaData(user: User): UserMetadata {
  return {
    email: user.email,
    role: user.role,
  };
}
