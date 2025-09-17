import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

// Info needed to log in
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: "Password must contain at least one letter and number",
  })
  @ApiProperty()
  password: string;
}
