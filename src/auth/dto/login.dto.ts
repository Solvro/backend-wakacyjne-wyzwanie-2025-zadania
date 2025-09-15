import { IsEmail, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "Adam@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ writeOnly: true })
  @IsString()
  password: string;
}
