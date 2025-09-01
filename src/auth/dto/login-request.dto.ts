import { IsEmail, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
  @ApiProperty()
  @IsEmail({ message: "Pole email musi być poprawnym emailem" })
  email: string;
  @ApiProperty()
  @IsString({ message: "Pole password musi być stringiem" })
  password: string;
}
