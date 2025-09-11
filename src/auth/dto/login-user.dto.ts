import { IsEmail, IsString, Length } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  @Length(5)
  email!: string;

  @ApiProperty()
  @Length(5)
  @IsString()
  password!: string;
}
