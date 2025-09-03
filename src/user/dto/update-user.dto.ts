import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class UserUpdateDto {
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @ApiPropertyOptional()
  newAboutMe?: string | null;
  @IsOptional()
  @MaxLength(15)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string | null;
}
