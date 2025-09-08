import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    example: "user@example.com",
  })
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty({
    example: "password123",
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64)
  password: string;

  @ApiPropertyOptional({
    example: "John Doe",
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  name?: string;

  @ApiPropertyOptional({
    example: "I like trains",
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  aboutMe?: string;
}
