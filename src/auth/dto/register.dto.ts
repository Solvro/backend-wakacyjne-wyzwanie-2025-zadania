import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "Adam@example.com" })
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({ minLength: 8, writeOnly: true })
  @IsString()
  @MinLength(8)
  @MaxLength(150)
  password: string;

  @ApiPropertyOptional({ example: "Joe" })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  name?: string;
}
