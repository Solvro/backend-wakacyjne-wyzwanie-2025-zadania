import { expense_category } from "@prisma/client";
import { IsEnum, IsNumber, IsPositive, Max } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  @IsNumber({}, { message: "Pole ID wycieczki musi być liczbą " })
  trip_id: number;

  @ApiProperty()
  @IsNumber({}, { message: "Kwota musi być liczbą" })
  @IsPositive({ message: "Kwota musi być większa niż 0" })
  @Max(1_000_000, { message: "Kwota nie może przekraczać 1 000 000" })
  amount: number;

  @ApiProperty()
  @IsEnum(expense_category, { message: "Pole musi być typu expense_category" })
  category: expense_category;
}
