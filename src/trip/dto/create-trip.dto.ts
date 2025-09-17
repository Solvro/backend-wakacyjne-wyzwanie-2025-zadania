import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, MaxLength } from "class-validator";

export class CreateTripDto {
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @IsString()
  @MaxLength(100)
  @ApiProperty()
  location: string;
}
