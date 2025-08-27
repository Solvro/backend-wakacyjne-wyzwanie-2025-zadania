import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty({
    description: "Name of the expense",
    example: "Dinner",
  })
  @IsString()
  what: string;

  @ApiPropertyOptional({
    description: "Optional description of the expense",
    example: "Dinner at a local restaurant",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Amount spent on the expense",
    example: 120.53,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: "ID of the trip this expense belongs to",
    example: 1,
  })
  @IsInt()
  trip_id: number;

  @ApiProperty({
    description: "ID of the person who paid for the expense",
    example: 2,
  })
  @IsInt()
  person_id: number;

  @ApiProperty({
    description: "ID of the participant associated with the expense",
    example: 3,
  })
  @IsInt()
  participant_id: number;
}
