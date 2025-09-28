import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class ResponseExpenseDto {
  @ApiProperty()
  @IsNumber()
  dailyPrice: number;

  @ApiProperty()
  @IsNumber()
  tripId: number;

  @ApiProperty()
  @IsBoolean()
  discount: boolean;
}
