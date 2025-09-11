import { ApiProperty } from "@nestjs/swagger";

export class ResponseExpenseDto {
  @ApiProperty()
  dailyPrice: number;

  @ApiProperty()
  tripId: number;

  @ApiProperty()
  discount: boolean;
}
