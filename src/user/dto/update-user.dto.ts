import { Sex } from "@prisma/client";
import { IsOptional, IsString, MaxLength } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(15)
  @ApiPropertyOptional()
  name?: string | null;
  @IsOptional()
  @MaxLength(15)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  middleName?: string | null;
  @IsOptional()
  @IsString()
  @MaxLength(15)
  @ApiPropertyOptional()
  lastName?: string | null;
  @IsOptional()
  @ApiPropertyOptional()
  sex?: Sex | null;
}
