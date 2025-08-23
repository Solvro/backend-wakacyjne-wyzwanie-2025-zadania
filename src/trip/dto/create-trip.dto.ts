import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  Destination: string;

  @ApiPropertyOptional()
  Description?: string;

  @ApiProperty()
  Start_Date: Date;

  @ApiProperty()
  End_Date: Date;
}
