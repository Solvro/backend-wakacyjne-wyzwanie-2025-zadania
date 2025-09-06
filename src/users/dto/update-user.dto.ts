import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
  @ApiPropertyOptional({ enum: ["USER", "ADMIN"] })
  @IsOptional()
  @IsString()
  role?: "USER" | "ADMIN";
}
