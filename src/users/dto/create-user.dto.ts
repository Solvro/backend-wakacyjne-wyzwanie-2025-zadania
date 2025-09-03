import { Role } from "@prisma/client";
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "Email address", example: "alice@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User hashed password",
    example: "dhs78aydh78sa",
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({ description: "Name of the user", example: "Alice" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: "User role", example: "USER" })
  @IsEnum(Role)
  role: Role;

  @ApiPropertyOptional({ description: "Birthday", example: "1990-01-01" })
  @IsDateString()
  @IsOptional()
  birthday?: string;
}
