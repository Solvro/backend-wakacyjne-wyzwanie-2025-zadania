import { IsBoolean, IsDateString, IsInt, IsNotEmpty } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { CreateExpenseDto } from "./create-expense.dto";

export class ExpenseResponseDto extends CreateExpenseDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsDateString()
  updatedAt: string = new Date().toString();

  @ApiProperty()
  @IsDateString()
  createdAt: string = new Date().toString();

  @ApiProperty()
  @IsBoolean()
  isArchived: boolean;
}
