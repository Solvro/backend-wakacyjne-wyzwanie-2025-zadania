import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { Role } from "@/lib/roles";
import type { UserMetadata } from "@/src/user/dto/user-metadata.dto";

export class UserSignupDto {
  @ApiProperty({
    description: "User's email address",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @ApiProperty({
    description: "User's password",
    example: "password123",
    minLength: 8,
    maxLength: 128,
  })
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(128, { message: "Password must not exceed 128 characters" })
  password: string;
}

export class UserLoginDto {
  @ApiProperty({
    description: "User's email address",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @ApiProperty({
    description: "User's password",
    example: "password123",
  })
  @IsString({ message: "Password must be a string" })
  @MinLength(1, { message: "Password cannot be empty" })
  password: string;
}

export class UpdateUserRolesDto {
  @ApiProperty({
    description: "User ID to update roles for",
    example: 1,
  })
  @IsNumber({}, { message: "User ID must be a number" })
  @IsPositive({ message: "User ID must be a positive number" })
  @IsInt({ message: "User ID must be an integer" })
  userId: number;

  @ApiProperty({
    description: "Array of role IDs to assign to the user",
    example: [0, 2],
    enum: Object.values(Role).filter((value) => typeof value === "number"),
    isArray: true,
  })
  @IsArray({ message: "Roles must be an array" })
  @ArrayNotEmpty({ message: "At least one role must be specified" })
  @IsEnum(Role, { each: true, message: "Each role must be a valid role ID" })
  roles: number[];
}

export class LoginResponseDto {
  @ApiProperty({
    description: "User's email address",
    example: "user@example.com",
  })
  email: string;

  @ApiProperty({
    description: "User's roles as a string",
    example: "000",
  })
  roles: string;

  @ApiProperty({
    description: "Authentication token with timestamp",
    example: "token_1693920000000:user@example.com",
  })
  token: string;

  @ApiProperty({
    description: "User's unique identifier",
    example: 1,
  })
  id: number;
}

export class UserRoleUpdateResponseDto {
  @ApiProperty({
    description: "User's unique identifier",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "User's email address",
    example: "user@example.com",
  })
  email: string;

  @ApiProperty({
    description: "Updated roles as a string",
    example: "101",
  })
  roles: string;

  @ApiProperty({
    description: "Human-readable role names",
    example: ["Administrator", "User"],
    isArray: true,
    type: String,
  })
  roleNames: string[];
}

export class UserListResponseDto {
  @ApiProperty({
    description: "User's unique identifier",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "User's email address",
    example: "user@example.com",
  })
  email: string;

  @ApiProperty({
    description: "User's roles as a string",
    example: "101",
  })
  roles: string;

  @ApiProperty({
    description: "Human-readable role names",
    example: ["Administrator", "User"],
    isArray: true,
    type: String,
  })
  roleNames: string[];
}

export class RequestWithUser extends Request {
  user?: UserMetadata;
}
