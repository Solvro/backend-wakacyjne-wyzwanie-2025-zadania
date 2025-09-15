import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "jan.kowalski@example.com",
    description: "Email address of the user",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "password123",
    description: "User password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
