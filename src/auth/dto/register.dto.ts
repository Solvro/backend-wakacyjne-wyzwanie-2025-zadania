import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "jan.kowalski@example.com",
    description: "Email address of the user",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "password123",
    description: "Password (minimum 8 characters)",
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: "Jan Kowalski",
    description: "Full name of the user",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
