import { Role } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

import { PartialType } from "@nestjs/swagger";

import { RegisterDto } from "../../auth/dto/register.dto";

export class UpdateUserDto extends PartialType(RegisterDto) {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
