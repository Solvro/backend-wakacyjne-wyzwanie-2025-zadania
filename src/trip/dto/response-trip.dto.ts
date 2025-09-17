import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, MaxLength } from "class-validator";

export class ResponseTripDto {
  @ApiProperty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  location: string;
}
