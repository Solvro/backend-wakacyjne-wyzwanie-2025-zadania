import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from "class-validator";
import { NiceAge } from "src/validators/nice-age";

export class RegisterUserDto {
  @IsString()
  @ApiProperty()
  @MaxLength(50)
  email: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  @ApiProperty()
  login: string;

  @IsString()
  @ApiProperty()
  @MaxLength(50)
  password: string;

  @IsNumber()
  @Validate(NiceAge)
  @ApiProperty()
  age: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;
}
