import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "Adam@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiPropertyOptional({ required: false, example: "Joe" })
  @IsOptional()
  @IsString()
  name?: string;
}
