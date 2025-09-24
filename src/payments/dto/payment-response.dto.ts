import { ApiProperty } from "@nestjs/swagger";

export class PaymentResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 100.5,
  })
  amount: number;

  @ApiProperty({
    example: 1,
  })
  currencyId: number;

  @ApiProperty({
    example: 301.5,
  })
  amountPLN: number;

  @ApiProperty({
    example: "2023-01-01T00:00:00Z",
  })
  createdAt: Date;
}
