import { Category } from "@prisma/client";
import { IsEnum, IsNumber, IsPositive, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({
    description: "Expense amount",
    example: 125.5,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: "Expense category",
    enum: Category,
    example: Category.FOOD,
  })
  @IsEnum(Category)
  category: Category;

  @ApiProperty({
    description: "Description of the expense",
    example: "Lunch at a local restaurant",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "ID of the trip associated with the expense",
    example: 1,
  })
  @IsNumber()
  tripId: number;
}
