import { Category } from "@prisma/client";
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ExpenseResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ enum: Category })
  @IsEnum(Category)
  category: Category;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  tripId: number;

  @ApiPropertyOptional({
    type: "object",
    properties: {
      destination: {
        type: "string",
      },
    },
  })
  @IsOptional()
  @IsObject()
  trip?: {
    destination: {
      type: "string";
    };
  };
}
