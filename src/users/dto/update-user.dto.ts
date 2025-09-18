import { IsOptional, IsString, MaxLength } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiPropertyOptional({
    description: "User name",
    maxLength: 50,
    example: "Jan Kowalski",
  })
  name?: string;
}
