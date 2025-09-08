import { AuthRole } from "@prisma/client";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: "Updated user name",
    example: "John Doe",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: "Updated email",
    example: "john.doe@example.com",
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: "Updated role",
    enum: AuthRole,
    enumName: "AuthRole",
  })
  @IsOptional()
  @IsEnum(AuthRole)
  role?: AuthRole;

  @ApiPropertyOptional({
    description: "Whether the user is enabled",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @ApiPropertyOptional({
    description:
      "Updated password (hashed or plain depending on service logic)",
    example: "$2b$12$examplehash...",
  })
  @IsOptional()
  @IsString()
  password?: string;
}
