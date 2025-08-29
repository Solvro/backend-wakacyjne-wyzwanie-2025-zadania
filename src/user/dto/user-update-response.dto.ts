import type { User } from "@prisma/client";

export interface UserUpdateResponseDto {
  email?: string;
  about_me: string | null;
  name: string | null;
}

export function userToUserUpdateDto(user: User): UserUpdateResponseDto {
  return {
    email: user.email,
    about_me: user.about_me,
    name: user.name,
  };
}
