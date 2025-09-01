import type { Role } from "@prisma/client";

export class CreateUserResponseDto {
  email!: string;
  aboutMe?: string;
  role!: Role;
  isEnabled!: boolean;
  name?: string;
  message!: "User created";
}
