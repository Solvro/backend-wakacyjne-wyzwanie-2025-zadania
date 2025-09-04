import { Role } from "@prisma/client";
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

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
  name?: string | null;

  @ApiPropertyOptional({ description: "Birthday", example: "1990-01-01" })
  @IsDate()
  @IsOptional()
  birthday?: Date | null;

  @ApiProperty({
    description: "Role of the user",
    example: "USER",
  })
  @IsEnum(Role)
  role: Role;
}
