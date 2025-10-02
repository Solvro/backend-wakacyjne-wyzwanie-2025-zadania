import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CurrencyRateDto {
  @ApiProperty({ example: "USD" })
  code: string;

  @ApiPropertyOptional({ example: "US Dollar" })
  name?: string;

  @ApiProperty({ example: 4.35 })
  rateToPLN: number;

  @ApiProperty({ example: "2025-09-19T12:00:00.000Z" })
  updatedAt: Date;
}
