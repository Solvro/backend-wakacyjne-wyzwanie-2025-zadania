import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsString, MaxLength } from "class-validator";

export class CreateTripDto {
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  endDate: Date;

  @IsString()
  @MaxLength(100)
  @ApiProperty()
  location: string;
}
