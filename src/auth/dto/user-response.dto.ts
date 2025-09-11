import { AuthRole } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty() email!: string;
  @ApiProperty({ nullable: true }) name!: string | null;
  @ApiProperty({ enum: AuthRole }) role!: AuthRole;
  @ApiProperty() isEnabled!: boolean;
}
