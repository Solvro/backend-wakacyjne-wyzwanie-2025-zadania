import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  @IsNumber()
  participantId!: number;

  @ApiProperty()
  @IsString()
  destination!: string;

  @ApiProperty({ type: String, format: "date-time" })
  @Type(() => Date)
  @IsDate()
  startDate!: Date;

  @ApiProperty({ type: String, format: "date-time" })
  @Type(() => Date)
  @IsDate()
  endDate!: Date;
}
