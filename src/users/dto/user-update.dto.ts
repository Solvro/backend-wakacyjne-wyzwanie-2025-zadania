import { IsOptional, IsString, MaxLength } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiPropertyOptional()
  newAboutMe?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @ApiPropertyOptional()
  newName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  targetEmail?: string;
}
