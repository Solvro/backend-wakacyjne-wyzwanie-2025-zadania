import type { Role } from "@prisma/client";

export class CreateUserResponseDto {
  email!: string;
  aboutMe?: string;
  password!: string;
  role!: Role;
  isEnabled!: boolean;
  name?: string;
}
