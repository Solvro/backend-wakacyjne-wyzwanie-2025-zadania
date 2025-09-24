import { ApiProperty } from "@nestjs/swagger";

export class CurrencyResponseDto {
  @ApiProperty({
    example: "USD",
    description: "Three-letter ISO currency code (e.g., USD, EUR, GBP)",
  })
  code: string;

  @ApiProperty({
    example: 4.5,
    description: "Exchange rate for the currency against PLN",
  })
  rate: number;
}
