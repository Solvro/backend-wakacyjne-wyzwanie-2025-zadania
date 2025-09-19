import { Role } from "@prisma/client";
import { IsEmail, IsEnum } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UpdateRoleDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
