import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  destination: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  start_Date: Date;

  @ApiProperty()
  end_Date: Date;
}
