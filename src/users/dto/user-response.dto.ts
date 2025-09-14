import { Role } from "@prisma/client";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsPastDate } from "../../validators/past-date.validator";

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
  @Validate(IsPastDate)
  birthday?: Date | null;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
