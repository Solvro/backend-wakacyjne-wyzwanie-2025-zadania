import { ApiProperty } from "@nestjs/swagger";

export class ResponseExpenseDto {
  @ApiProperty()
  trip_id: number;
  @ApiProperty()
  desc: string;
  @ApiProperty()
  price: number;
}
