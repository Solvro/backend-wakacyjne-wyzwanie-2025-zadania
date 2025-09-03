import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    description: "Username for authentication",
    example: "johndoe",
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: "Password for authentication",
    example: "password123",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
