import { UserRole } from "@prisma/client";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: "User full name",
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: "Name must be a string" })
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  @MaxLength(100, { message: "Name cannot exceed 100 characters" })
  name?: string;

  @ApiPropertyOptional({ description: "User email address" })
  @IsOptional()
  @IsEmail({}, { message: "Please provide a valid email address" })
  email?: string;

  @ApiPropertyOptional({
    description:
      "User password (min 8 chars, must contain uppercase, lowercase and number)",
  })
  @IsOptional()
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  password?: string;

  @ApiPropertyOptional({ description: "Whether user account is enabled" })
  @IsOptional()
  @IsBoolean({ message: "isEnabled must be a boolean value" })
  isEnabled?: boolean;

  @ApiPropertyOptional({
    enum: UserRole,
    description: "User role",
  })
  @IsOptional()
  @IsEnum(UserRole, { message: "Role must be a valid enum value" })
  role?: UserRole;
}
