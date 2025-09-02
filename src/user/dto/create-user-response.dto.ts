import type { Role } from "@prisma/client";

export class CreateUserResponseDto {
  email!: string;
  aboutMe?: string;
  role!: Role;
  name?: string;
  message!: "User created";
}
