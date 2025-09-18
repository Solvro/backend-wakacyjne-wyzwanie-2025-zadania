import type { UserRole } from "@prisma/client";

export interface UserResponseDto {
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
}
