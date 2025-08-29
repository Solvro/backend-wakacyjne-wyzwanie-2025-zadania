import { IsDateString, IsEmail, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonDto {
  @ApiProperty({ description: "Name of the person", example: "Alice" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Email address", example: "alice@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Birthday", example: "1990-01-01" })
  @IsDateString()
  birthday: string;
}
