import { trip_type } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsAfterStartDate } from "../../validators/is-after-start-date.validator";

export class CreateTripDto {
  @ApiProperty()
  @IsString({ message: "Pole destination musi być stringiem" })
  destination: string;

  @ApiProperty()
  @IsEnum(trip_type, {
    message: "Pole type musi być poprawnym typem wycieczki",
  })
  type: trip_type;

  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: "Pole start_date musi być poprawną datą" })
  start_date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "Pole end_date musi być poprawną datą" })
  @IsAfterStartDate({
    message: "Pole end_date musi mieć późniejszą datę niż data start_date",
  })
  end_date?: Date;
}
