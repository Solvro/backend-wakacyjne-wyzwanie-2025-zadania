import { Role } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  name?: string | null;

  @ApiProperty()
  role: Role;

  @ApiPropertyOptional()
  birthday?: Date | null;
}
