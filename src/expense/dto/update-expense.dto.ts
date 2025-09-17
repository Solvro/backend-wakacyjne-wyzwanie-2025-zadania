import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

import { CreateExpenseDto } from "./create-expense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  dailyPrice?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  tripId?: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  discount?: boolean;
}
