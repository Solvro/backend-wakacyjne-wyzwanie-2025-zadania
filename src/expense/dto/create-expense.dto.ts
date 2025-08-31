import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  dailyPrice: number;

  @ApiProperty()
  tripId: number;

  @ApiProperty()
  discount: boolean;
}
