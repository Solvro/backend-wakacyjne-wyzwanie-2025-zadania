import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({
    description: "Description of the expense",
    example: "Lunch with clients",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Amount of the expense",
    example: 45.5,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: "Currency of the expense",
    example: "USD",
  })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({
    description: "Date of the expense (ISO 8601 format)",
    example: "2025-08-27T12:00:00Z",
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: "ID of the participant related to the expense",
    example: 3,
  })
  @IsNumber()
  participant_id: number;

  @ApiProperty({
    description: "ID of the trip related to the expense",
    example: 7,
  })
  @IsNumber()
  trip_id: number;
}
