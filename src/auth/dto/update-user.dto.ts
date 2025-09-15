import { Role } from "@prisma/client";
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";

import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";

import { RegisterDto } from "../../auth/dto/register.dto";

export class UpdateUserDto extends PartialType(RegisterDto) {
  @ApiPropertyOptional({ example: "ADMIN" })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({
    example: "Some extra info, for example: likes fishing. ",
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  additionalInfo?: string;
}
