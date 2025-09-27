import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsString, MaxLength } from "class-validator";

export class ResponseTripDto {
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @Type(() => Date)
  @ApiProperty()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  location: string;
}
