import { Role } from "@prisma/client";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Min,
  Validate,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { NoSpaces } from "../validation/no-spaces.validator";

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @Min(5)
  email!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  aboutMe?: string;

  @ApiProperty()
  @IsString()
  @Min(5)
  password!: string;

  @ApiProperty()
  @IsEnum(Role)
  role!: Role;

  @ApiProperty()
  @IsBoolean()
  isEnabled!: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Validate(NoSpaces)
  name?: string;
}
