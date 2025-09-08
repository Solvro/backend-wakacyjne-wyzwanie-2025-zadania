import type { User } from "@prisma/client";

export interface UserUpdateResponseDto {
  name: string | null;
  aboutMe: string | null;
}

export function userToUserMetadata(user: User): UserUpdateResponseDto {
  return {
    name: user.name,
    aboutMe: user.about_me,
  };
}
