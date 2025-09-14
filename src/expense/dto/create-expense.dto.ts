import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
  @ApiProperty()
  trip_id: number;
  @ApiProperty()
  desc: string;
  @ApiProperty()
  price: number;
}
