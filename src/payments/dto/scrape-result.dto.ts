import { ApiProperty } from "@nestjs/swagger";

export class ScrapeResultDto {
  @ApiProperty()
  symbol: string;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  buy: number;

  @ApiProperty()
  sell: number;

  @ApiProperty()
  average: number;

  @ApiProperty()
  updateTime: Date;
}
