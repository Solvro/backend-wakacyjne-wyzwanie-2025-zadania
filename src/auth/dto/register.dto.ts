import { IsEmail, IsString, Validate } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { Password } from "../../validators/password.validator";

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @Validate(Password)
  password: string;
}
