import { IsInt, IsNumber, IsOptional } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({ description: "Koszt główny" })
  @IsNumber()
  cost: number;

  @ApiPropertyOptional({ description: "Dodatkowy koszt (opcjonalny)" })
  @IsNumber()
  @IsOptional()
  additional?: number;

  @ApiProperty({ description: "ID wycieczki" })
  @IsInt()
  tripId: number;
}
