import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty()
  destination: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;
}
