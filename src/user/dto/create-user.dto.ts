import { IsOptional, IsString, MaxLength, Validate } from "class-validator";
import { NiceText } from "src/validators/nice-text.validator";
import { Password } from "src/validators/password.validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(80)
  email: string;

  @ApiProperty()
  @IsString()
  @Validate(Password)
  password: string;
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Validate(NiceText)
  @ApiPropertyOptional()
  about_me?: string | null;
  @IsOptional()
  @MaxLength(15)
  @ApiPropertyOptional()
  @IsString()
  name?: string | null;
}
