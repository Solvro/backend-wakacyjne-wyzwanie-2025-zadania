import { Role } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ResponseUserDto {
  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  about_me?: string;

  @ApiProperty()
  is_enabled: boolean;

  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  surname: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
