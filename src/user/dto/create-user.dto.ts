import { Role } from "@prisma/client";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Validate,
} from "class-validator";

import { NoSpaces } from "../validation/no-spaces.validator";

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @Length(5)
  email!: string;

  @IsString()
  @Length(5)
  password!: string;

  @IsEnum(Role)
  role!: Role;

  @IsBoolean()
  isEnabled!: boolean;

  @IsOptional()
  @IsString()
  @Validate(NoSpaces)
  name?: string;

  @IsOptional()
  @IsString()
  aboutMe?: string;
}
