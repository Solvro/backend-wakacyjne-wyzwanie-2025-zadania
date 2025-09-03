import { IsOptional, IsString, Validate } from "class-validator";

import { NoSpaces } from "../validation/no-spaces.validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Validate(NoSpaces)
  name?: string;

  @IsString()
  @IsOptional()
  aboutMe?: string;
}
