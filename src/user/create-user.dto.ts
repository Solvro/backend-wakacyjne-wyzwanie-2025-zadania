import { AuthRole } from "@prisma/client";
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
    example: "john.doe@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User password (plain, will be hashed in service)",
    example: "strongPassword123",
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "User role",
    enum: AuthRole,
    enumName: "AuthRole",
  })
  @IsEnum(AuthRole)
  role: AuthRole;

  @ApiProperty({
    description: "Whether the user is enabled",
    example: true,
  })
  @IsBoolean()
  isEnabled: boolean;

  @ApiPropertyOptional({
    description: "User name (optional)",
    example: "John Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
