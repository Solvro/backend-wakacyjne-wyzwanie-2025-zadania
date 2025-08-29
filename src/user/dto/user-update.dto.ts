import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

import { NiceText } from "../../validators/nice-text.validator";

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Validate(NiceText)
  @ApiPropertyOptional()
  newAboutMe?: string | null;
  @IsOptional()
  @MaxLength(15)
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string | null;

  @IsEmail()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  email?: string;
}
