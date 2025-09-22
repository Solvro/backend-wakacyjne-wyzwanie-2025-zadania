import { Role } from "@prisma/client";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "User email",
    example: "jankowalski@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User password (will be hashed later)",
    example: "strongPassword123",
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "User role",
    enum: Role,
    enumName: "Role",
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: "Whether the user is enabled",
    example: true,
  })
  @IsBoolean()
  is_enabled: boolean;

  @ApiPropertyOptional({
    description: "User name (optional)",
    example: "Jan Kowalski",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
