import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

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
    description: "Email of the user who paid for the expense",
    example: "janko@gmail.com",
  })
  @IsEmail()
  user_email: string;
}
