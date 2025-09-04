import { Role } from "@prisma/client";
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  birthday?: Date | null;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
