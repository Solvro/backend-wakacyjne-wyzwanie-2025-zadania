import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: "Number of items to display",
    default: 10,
  })
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @ApiPropertyOptional({ description: "Number of items to skip", default: 0 })
  skip?: number = 0;
}
