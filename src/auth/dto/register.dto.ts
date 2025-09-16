import { Sex } from "@prisma/client";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterDto {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  passwordConfirmation: string;

  @IsString()
  @ApiProperty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @MinLength(2)
  middleName?: string;

  @IsString()
  @ApiProperty()
  @MinLength(2)
  lastName: string;

  @ApiProperty()
  @IsEnum(Sex)
  sex: Sex;
}
