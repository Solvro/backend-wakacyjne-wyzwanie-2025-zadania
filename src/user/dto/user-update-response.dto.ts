import type { Sex, User } from "@prisma/client";

export interface UserUpdateResponseDto {
  name: string | null;
  middleName: string | null;
  lastName: string | null;
  sex: Sex | null;
}

export function userToUserUpdateDto(user: User): UserUpdateResponseDto {
  return {
    name: user.name,
    middleName: user.middleName,
    lastName: user.lastName,
    sex: user.sex,
  };
}
