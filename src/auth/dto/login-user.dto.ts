import { IsEmail, IsString, Min } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  @Min(5)
  email!: string;

  @ApiProperty()
  @Min(5)
  @IsString()
  password!: string;
}
