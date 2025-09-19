import { IsEmail } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
