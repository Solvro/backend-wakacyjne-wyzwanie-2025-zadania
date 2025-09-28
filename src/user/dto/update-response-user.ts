import type { User } from "@prisma/client";

export interface UserUpdateResponseDto {
  email: string | null;
  login: string | null;
  description: string | null;
  age: number | null;
}

export function userToUserUpdateDto(user: User): UserUpdateResponseDto {
  return {
    email: user.email,
    login: user.login,
    description: user.description,
    age: user.age,
  };
}
