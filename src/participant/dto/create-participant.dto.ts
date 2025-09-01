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
  @Length(2, 50, { message: "Imię musi być od 2 do 50 znaków" })
  name: string;

  @ApiProperty()
  @IsString({ message: "Pole name musi być stringiem" })
  @Length(2, 50, { message: "Nazwisko musi być od 2 do 50 znaków" })
  surname: string;

  @ApiProperty()
  @IsNumber({}, { message: "Wiek musi być liczbą" })
  @Min(0, { message: "Wiek nie może być ujemny" })
  age: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "Numer telefonu musi być stringiem" })
  phone_num?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail({ message: "Pole musi być poprawnym emailem" })
  email?: string;
}
