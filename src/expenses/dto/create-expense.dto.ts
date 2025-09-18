import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({ example: 129.99, description: "Price of the expense" })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 1, description: "ID of the trip" })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  trip_id: number;

  @ApiProperty({ example: 1, description: "ID of the user" })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  user_id: number;
}
