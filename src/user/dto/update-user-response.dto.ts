import type { User } from "@prisma/client";

export interface UserUpdateResponseDto {
  email: string | null;
  aboutMe: string | null;
  name: string | null;
}

export function userToUserUpdateDto(user: User): UserUpdateResponseDto {
  return {
    email: user.email,
    aboutMe: user.about_me,
    name: user.name,
  };
}
