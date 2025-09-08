import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
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
}
