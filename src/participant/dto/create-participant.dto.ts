import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateParticipantDto {
  @ApiProperty()
  @IsString({ message: "Pole name musi być stringiem" })
  @Length(2, 50, { message: "Pole imię musi być od 2 do 50 znaków" })
  name: string;

  @ApiProperty()
  @IsString({ message: "Pole surname musi być stringiem" })
  @Length(2, 50, { message: "Pole surname musi być od 2 do 50 znaków" })
  surname: string;

  @ApiProperty()
  @IsNumber({}, { message: "Pole age musi być liczbą" })
  @Min(0, { message: "Pole age nie może być ujemny" })
  age: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "Pole phone_num musi być stringiem" })
  phone_num?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail({ message: "Pole email musi być poprawnym emailem" })
  email?: string;
}
