import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateExpenseDto {
  @ApiPropertyOptional({
    description: "Updated description",
    example: "Hotel booking",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: "Updated amount", example: 120.75 })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ description: "Updated currency", example: "EUR" })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({
    description: "Updated date (ISO 8601)",
    example: "2025-08-30T12:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ description: "Updated participant ID", example: 2 })
  @IsOptional()
  @IsNumber()
  participant_id?: number;

  @ApiPropertyOptional({ description: "Updated trip ID", example: 5 })
  @IsOptional()
  @IsNumber()
  trip_id?: number;
}
