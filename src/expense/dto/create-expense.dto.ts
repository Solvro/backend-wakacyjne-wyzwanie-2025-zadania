import { IsNumber, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  @IsNumber()
  tripId!: number;

  @ApiProperty()
  @IsNumber()
  expenseAmount!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  expenseDescription?: string;
}
