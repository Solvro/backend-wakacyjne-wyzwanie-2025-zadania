import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "alice@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8, example: "S3cureP@ss" })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @ApiPropertyOptional({ example: "Alice" })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string | null;
}
