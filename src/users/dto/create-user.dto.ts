import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiPropertyOptional({ description: "Name of the user", example: "Alice" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: "Email address", example: "alice@example.com" })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: "Birthday", example: "1990-01-01" })
  @IsDateString()
  @IsOptional()
  birthday?: string;
}
