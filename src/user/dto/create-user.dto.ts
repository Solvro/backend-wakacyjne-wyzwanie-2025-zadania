import { Role } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  aboutMe?: string;

  @ApiProperty()
  password!: string;

  @ApiProperty()
  role!: Role;

  @ApiProperty()
  isEnabled!: boolean;

  @ApiPropertyOptional()
  name?: string;
}
