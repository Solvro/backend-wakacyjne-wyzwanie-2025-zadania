import type { User, UserRole } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty() id!: number;
  @ApiProperty() email!: string;
  @ApiProperty({ enum: ["USER", "ADMIN"] }) role!: UserRole;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(
    entity: Pick<User, "id" | "email" | "role" | "createdAt" | "updatedAt">,
  ): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.role = entity.role;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
