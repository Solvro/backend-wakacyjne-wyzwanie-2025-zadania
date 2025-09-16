import { ApiProperty } from "@nestjs/swagger";

export class CurrencyResponse {
  @ApiProperty()
  currency: string;

  @ApiProperty()
  rate: number;

  @ApiProperty()
  timestamp: Date;
}
